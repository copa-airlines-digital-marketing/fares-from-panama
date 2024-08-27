import { addHours, isAfter, isBefore, parseJSON } from "date-fns"
import { getFromStorage, saveToLocalStorage } from "./local-storage"
import { isViajaPanamaFareDaysArray, isViajaPanamaFareDestinationArray } from "./fares"
import { all, F, groupBy, isEmpty, isNil, map, prop, values } from "ramda"
import { isDestinationArray, } from "./destinations"
import { getLowestFaresByDestinationAndDays } from "../modules/lowests"

type FaresRequestParams = {
  days?: string,
  destination?: string,
  month?: string,
}

type KeyReturnTypeMap = {
  days: number[]
  destinations: unknown[]
  calendar: unknown[]
  histogram: unknown[]
  byDestination: unknown[]
}

const FIRST_DATE = new Date(2024, 1, 1)

const HOURS_TO_CHECK = 2

const UPDATE_TIME_KEY = 'nextUpdate'

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
  byDestination: fetchAPI('by-destination')
}

const getDateFromFares = (response: unknown) => {
  let dateString: string = NOT_FOUND_VALUE

  if (isViajaPanamaFareDaysArray(response))
    dateString = response[0].min.updated_at

  if (dateString === NOT_FOUND_VALUE) 
    return FIRST_DATE

  try {
    return parseJSON(dateString)
  } catch (error) {
    console.log(error)
    return FIRST_DATE
  }
}

const getDaysOfFares = (response: unknown) => {
  if(isViajaPanamaFareDaysArray(response))
    return {
      days: response.map(value => value.days)
    }

  return {}
}

const getDestinationsOfFares = (response: unknown) => {
  try {

    if (!Array.isArray(response))
      return {}

    const [destinationResult, lowestsResult] = response

    if(isDestinationArray(destinationResult) && isViajaPanamaFareDestinationArray(lowestsResult)) {
      return {destinations: {
        lowests: getLowestFaresByDestinationAndDays(lowestsResult),
        destinations: map((value) => value[0], groupBy(prop('iata_code'), destinationResult))
      }}
    }
    return {}

  } catch (error) {
    console.error('Error while loading destinations and lowests', error)
    return {}
  }
}

const processRequestDataMap: Record<keyof KeyReturnTypeMap,(response: unknown) => Record<string, unknown>> = {
  days: getDaysOfFares,
  destinations: getDestinationsOfFares,
  calendar: () => {},
  histogram: () => {},
}

const getRequestedData = async (key: keyof KeyReturnTypeMap, params: FaresRequestParams) => {

  console.log('requesting from server:', key)

  try {
    
    const getDataRequest = await requestedDataMap[key](params)
    
    const data = await getDataRequest.json()
    
    const processedData = processRequestDataMap[key](data)

    if(isEmpty(processedData) || isNil(processedData) || all(isNil, values(processedData)) || all(isEmpty, values(processedData)))
      return []

    Object.keys(processedData).map(key => {
      try {
        saveToLocalStorage(window.localStorage, key, processedData[key])
      } catch (error) {
        console.error('error while saving to localStorage', error)
      }
    })
    
    const lastUpdate = getDateFromFares(data)
    
    const nextUpdate = parseJSON(getFromStorage(window.localStorage, UPDATE_TIME_KEY, (new Date()).toISOString()))
    
    console.log('requesting from server', processedData, lastUpdate, nextUpdate)
    
    if (isBefore(nextUpdate, lastUpdate)) 
      saveToLocalStorage(window.localStorage, UPDATE_TIME_KEY, addHours(lastUpdate, HOURS_TO_CHECK).toISOString())

    console.log(values(processedData))
    
    return values(processedData)

  } catch (error) {
    console.error(`Error while loading data: ${key}`, error)

    return Promise.resolve([])
  }
}

export const requestData = (key: keyof KeyReturnTypeMap, params: FaresRequestParams) => {
  const dataFromLocalStorage = getFromStorage(window.localStorage,key, NOT_FOUND_VALUE)

  const nextUpdateFromLocalStorage = getFromStorage(window.localStorage, key, NOT_FOUND_VALUE)

  try {
    const nextUpdate = parseJSON(nextUpdateFromLocalStorage)

    if (dataFromLocalStorage === NOT_FOUND_VALUE || isAfter(nextUpdate, new Date()))
      return getRequestedData(key, params)

    const parsedData = JSON.parse(dataFromLocalStorage)

    console.log(`from local storage: ${key}`, dataFromLocalStorage, parsedData)
    
    return Promise.resolve([parsedData])

  } catch (error) {
    console.error(error)

    return getRequestedData(key, params) // request data to fix any issue

  }
}