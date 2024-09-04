import { parseJSON } from "date-fns"
import { getFromStorage, saveToLocalStorage } from "./local-storage"
import { faresReturnSchema, isViajaPanamaFareArray, isViajaPanamaFareDaysArray, isViajaPanamaFareDestinationArray } from "./fares"
import { all, append, dropLast, groupBy, has, isEmpty, isNil, join, keys, map, mergeDeepLeft, pathOr, pick, pipe, prop, replace, values } from "ramda"
import { isDestinationArray, } from "./destinations"
import { getLowestFaresByDestinationAndDays } from "../modules/lowests"
import { getLowestByInterest } from "../modules/interest-fares"
import { prepareCalendarOfDestination, type CalendarModules } from "../modules/calendar-fares"
import { isObject } from "@melt-ui/svelte/internal/helpers"
import { isMinPriceByMonthArray, prepareHistogramFares, preparerHistogramMonths } from "../modules/histogram-fares"

type FaresRequestParams = {
  days?: string | number,
  destination?: string,
  departure?: string,
}

type KeyReturnTypeMap = {
  days: number[]
  destinations: unknown[]
  calendar: unknown[]
  histogram: unknown[]
  histogramMonth: unknown[]
}

const FIRST_DATE = new Date(2024, 1, 1)

const NOT_FOUND_VALUE = 'not found'

const fetchAPI = (name: string) => (data: FaresRequestParams) => {
  const params = new URLSearchParams(Object.entries(data))
  return fetch(`/api/${name}?${params.toString()}`, { method: 'GET'})
}

const requestedDataMap: Record<keyof KeyReturnTypeMap, (data: FaresRequestParams) => Promise<Response>> = {
  days: fetchAPI('days'),
  destinations: fetchAPI('destinations'),
  calendar: fetchAPI('calendar'),
  histogram: fetchAPI('histogram'),
  histogramMonth: fetchAPI('histogram-months')
}

const getDaysOfFares = (response: unknown, accumulatedValue?: unknown) => {
  if(isViajaPanamaFareDaysArray(response))
    return {
      days: response.map(value => value.days)
    }

  return {}
}

const getDestinationsOfFares = (response: unknown, accumulatedValue?: unknown) => {
  try {

    if (!Array.isArray(response))
      return {}

    const [destinationResult, lowestsResult] = response

    if(isDestinationArray(destinationResult) && isViajaPanamaFareDestinationArray(lowestsResult)) {
      const lowests = getLowestFaresByDestinationAndDays(lowestsResult)
      const destinations = pick(keys(groupBy(prop('destination'),lowestsResult)),map((value) => value[0], groupBy(prop('iata_code'), destinationResult)))
      const interests = getLowestByInterest(destinations, lowests)
      return {destinations: {
        lowests,
        destinations,
        ...interests
      }}
    }
    return {}

  } catch (error) {
    console.error('Error while loading destinations and lowests', error)
    return {}
  }
}

const getCalendarFares = (response: unknown, currentCalendar?: CalendarModules): {calendar: CalendarModules}  => {
  try {
    faresReturnSchema.array().parse(response)

    const calendar = prepareCalendarOfDestination(response)
    
    if(!currentCalendar)
      return {calendar}

    return { calendar:{
      calendarFares: { ...calendar.calendarFares, ...currentCalendar.calendarFares },
      calendarMonths: { ...calendar.calendarMonths, ...currentCalendar.calendarMonths }
    }}

  } catch (error) {
    console.error(`Error while loading calendar fares for`, error)
    return <{calendar: CalendarModules}>{}
  }
}

const getMinByMonthsAndDays = (response: unknown, accumulatedValue?: unknown) => {

  if(!isMinPriceByMonthArray(response))
    return

  const histogramMonth = preparerHistogramMonths(response)

  return {histogramMonth}
}

const getHistogramFares = (response: unknown, currentHistogram?: CalendarModules): {histogram: App.FaresByDate} => {
  try {

    faresReturnSchema.array().parse(response)

    const histogram: App.FaresByDate = prepareHistogramFares(response)

    if(!currentHistogram)
      return { histogram }

    const newHistogram = mergeDeepLeft(histogram, currentHistogram)
    
    return {
      histogram: newHistogram
    }

  } catch (error) {
    console.error(`Error while loading histogram fares for`, error)
    return <{histogram: App.FaresByDate}>{}
  }
}

const processRequestDataMap: Record<keyof KeyReturnTypeMap,(response: unknown, accumulatedValue?: unknown) => Record<string, unknown>> = {
  days: getDaysOfFares,
  destinations: getDestinationsOfFares,
  calendar: getCalendarFares,
  histogramMonth: getMinByMonthsAndDays,
  histogram: getHistogramFares,
}

const getRequestedData = async (key: keyof KeyReturnTypeMap, params: FaresRequestParams, accumulatedValue?: unknown) => {

  try {
    
    const getDataRequest = await requestedDataMap[key](params)
    
    const data = await getDataRequest.json()
    
    const processedData = processRequestDataMap[key](data, accumulatedValue)

    if(isEmpty(processedData) || isNil(processedData) || all(isNil, values(processedData)) || all(isEmpty, values(processedData)))
      return []

    Object.keys(processedData).map(key => {
      try {
        saveToLocalStorage(window.tvpFares, key, processedData[key])
      } catch (error) {
        console.error('error while saving to localStorage', error)
      }
    })
        
    return values(processedData)

  } catch (error) {
    console.error(`Error while loading data: ${key}`, error)

    return Promise.resolve([])
  }
}

const validateCalendarOnLocalStorage = (values: unknown, params?: FaresRequestParams) => {
  if(!params || !isObject(params) || !has('destination', params)) 
    return []

  const { destination } = params

  if(!destination) return []

  if(!values || !Array.isArray(values))
    return getRequestedData('calendar', params)
  
  const calendar = values[0]
  
  if(!calendar || !isObject(calendar) || !has('calendarMonths', calendar) || !has('calendarFares', calendar))
    return getRequestedData('calendar', params)
  
  const { calendarMonths, calendarFares } = calendar

  if(!calendarMonths || !isObject(calendarMonths) || !has(destination, calendarMonths) || !calendarFares || !isObject(calendarFares) || !has(destination, calendarFares))
    return getRequestedData('calendar', params, calendar)
  
  return values
}

const validateHistogramOnLocalStorage = (values: unknown, params?: FaresRequestParams) => {

  if(!params || !isObject(params) || !has('days', params) || !has('departure', params)) 
    return []

  const { days, departure } = params

  if( !days || !departure ) return []
  
  if( !values || !Array.isArray(values) )
    return getRequestedData( 'histogram', params )
  
  const histogram = values[0]
  
  if( !histogram || !isObject(histogram) )
    return getRequestedData( 'histogram', params )
  
  const histogramDays = histogram[days]

  const formatedDeparture = pipe(dropLast(2), replace(/-/g, ''), append('01'), join(''))

  if(!histogramDays || !isObject(histogramDays) || !has(formatedDeparture(departure), histogramDays))
    return getRequestedData('histogram', params, histogram)
  
  return values
}

const validateProperData: Record<keyof KeyReturnTypeMap, (values: unknown, params?: FaresRequestParams) => unknown> = {
  days: (values: unknown, params?: FaresRequestParams) =>  values,
  destinations: (values: unknown, params?: FaresRequestParams) =>  values,
  calendar: validateCalendarOnLocalStorage,
  histogram: validateHistogramOnLocalStorage,
  histogramMonth: (values: unknown, params?: FaresRequestParams) =>  values
}

export const requestData = (key: keyof KeyReturnTypeMap, params: FaresRequestParams) => {
  window.tvpFares = window.tvpFares || new Map<string, string>()

  const dataFromLocalStorage = getFromStorage(window.tvpFares,key, NOT_FOUND_VALUE)

  try {
    if (dataFromLocalStorage === NOT_FOUND_VALUE || (key !== 'calendar' && key !== 'histogram'))
      return getRequestedData(key, params)

    const parsedData = JSON.parse(dataFromLocalStorage)
    
    return Promise.resolve(validateProperData[key]([parsedData], params))

  } catch (error) {
    console.error(error)

    return getRequestedData(key, params) // request data to fix any issue

  }
}