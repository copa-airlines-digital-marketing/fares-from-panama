import { addHours, isAfter, isBefore, parseJSON } from "date-fns"
import { getFromStorage, saveToLocalStorage } from "./local-storage"
import { fareDestinationReturnSchema, isViajaPanamaFareDaysArray, isViajaPanamaFareDestinationArray } from "./fares"
import { all, isEmpty, isNil } from "ramda"
import { addDestination, destinationReturnSchema, isDestinationArray, transformDestinations, type DestinationReturnSchema } from "./destinations"

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

type LowestReturnSchema =  [App.Destination, App.FaresByDays, App.InterestFares, App.LowestFareByInterest]

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

const toAppDestinations = (destinations: DestinationReturnSchema[]): App.Destination => destinations.reduce(
  (accum, current) => ({...accum, [current.iata_code]: current}), 
  {}
)

const processLowestFares = (allDestinations: App.Destination) => (accumulator: LowestReturnSchema, fare: fareDestinationReturnSchema) => {
  const destinationOfFare = allDestinations[fare.destination]
  
  if(!destinationOfFare)
    return accumulator

  const categories = destinationOfFare.

  const [destinations, lowests, interests, interestLowests] = accumulator 

  return [
    {...destinations, [destinationOfFare.iata_code]: destinationOfFare},
    {...lowests, [fare.days.toString()]: {[fare.destination]: {price: fare.min.price, score: fare.max.score}}},
    ,
    ,
  ]
}


const transformLowest = (destinations: App.Destination, fares: fareDestinationReturnSchema[]): LowestReturnSchema => {
  fares.reduce(,[])
  return {}
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
  let result: number[] = []
  if(isViajaPanamaFareDaysArray(response))
    result = response.map(value => value.days)

  return result
}

const getDestinationsOfFares = (response: unknown) => {
  let result: {destinations?: App.Destination, lowests?: fareDestinationReturnSchema[]} = {}
  try {

    if (!Array.isArray(response))
      return {}

    const [destinationResult, lowestsResult] = response

    if(isDestinationArray(destinationResult) && isViajaPanamaFareDestinationArray(lowestsResult)) {
      const allDestinations = toAppDestinations(destinationResult)
      const [destinations, lowests, interests, interestLowest ] = 
      console.log('here',lowests.map(addDestination(transformDestinations(destination))).reduce((a, c) => ({ ...a, [c.iata_code]: c }), {}))
      console.log(lowests)

    }

    return {}

  } catch (error) {
    console.error('Error while loading destinations and lowests', error)
    return {}
  }
  //destinations.reduce((a, c) => ({ ...a, [c.iata_code]: c }), {})
}

const getBestFaresByDestination = (response: unknown) => {
  console.log(this, response)
  return [null]  
}

const processRequestDataMap: Record<keyof KeyReturnTypeMap,(response: unknown) => unknown[]> = {
  days: getDaysOfFares,
  destinations: getDestinationsOfFares,
  calendar: () => [null],
  histogram: () => [null],
  byDestination: getBestFaresByDestination
}

const getRequestedData = async (key: keyof KeyReturnTypeMap, params: FaresRequestParams) => {

  console.log('requesting from server:', key)

  try {
    
    const getDataRequest = await requestedDataMap[key](params)
    
    const data = await getDataRequest.json()
    
    const processedData = processRequestDataMap[key](data)

    if(isEmpty(processedData) || all(isNil, processedData))
      return processedData

    saveToLocalStorage(window.localStorage, key, data)
    
    const lastUpdate = getDateFromFares(data)
    
    const nextUpdate = parseJSON(getFromStorage(window.localStorage, UPDATE_TIME_KEY, (new Date()).toISOString()))
    
    console.log('requesting from server', processedData, lastUpdate, nextUpdate)
    
    if (isBefore(nextUpdate, lastUpdate)) 
      saveToLocalStorage(window.localStorage, UPDATE_TIME_KEY, addHours(lastUpdate, HOURS_TO_CHECK).toISOString())
    
    return processedData

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
    
    const processedData = processRequestDataMap[key](parsedData)

    return Promise.resolve(processedData)

  } catch (error) {
    console.error(error)

    return getRequestedData(key, params) // request data to fix any issue

  }
}