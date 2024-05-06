import { aggregate, readItems, type AggregationOptions, type QueryFields, type QueryFilter } from "@directus/sdk"
import { createRestClient } from "./clients"
import { getYear } from "date-fns"
import { getMonth } from "../utils"

const FARES_COLLECTION_NAME: keyof Schema = 'viaja_panama_fares'

const faresReturnFieldsQuery: QueryFields<Schema, ViajaPanamaFare> = [
  'destination',
  'days',
  'departure',
  'return',
  'fare',
  'taxes',
  'price',
  'seats',
  'score'
]

const faresDestinationsGroup: AggregationOptions<Schema, 'viaja_panama_fares'> = {
  aggregate:{},
  groupBy: [
    'destination'
  ]
}

const faresDaysGroup: AggregationOptions<Schema, 'viaja_panama_fares'> = {
  aggregate:{},
  groupBy: [
    'days'
  ]
}

const calendarMonthFaresFilterQuery = (destination: string, days: number, departure: Date): QueryFilter<Schema, ViajaPanamaFare> => ({
  _and:[
    {
      destination: {
        _eq: destination
      }
    },
    {
      days: {
        _eq: days
      }
    },
    {
      "month(departure)": {
        _eq: getMonth(departure)
      }
    },
    {
      "year(departure)": {
        _eq: getYear(departure)
      }
    }
  ]
})

const calendarMonthsFilterQuery = (destination: string, days: number): AggregationOptions<Schema, 'viaja_panama_fares'> => ({
  aggregate: {
    min: 'price'
  },
  groupBy: [
    'destination',
    'days',
    'month(departure)',
    'year(departure)'
  ],
  query: {
    filter: {
      _and: [
        {destination: {_eq: destination}},
        {days: {_eq: days}}
      ]
    }
  }
  
})

export const getAllFares = (host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(readItems(FARES_COLLECTION_NAME, {
    fields: faresReturnFieldsQuery,
    limit: -1
  })) 
}

export const getDestinationsOfFares = (host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(aggregate(FARES_COLLECTION_NAME, faresDestinationsGroup))
}

export const getDaysOfFare = (host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(aggregate(FARES_COLLECTION_NAME, faresDaysGroup))
}

export const getFaresByDestinationStayAndMonthYear = (host: string, token: string, destination: string, days: number, departure: Date) => {
  const client = createRestClient(host, token)
  return client.request(readItems(FARES_COLLECTION_NAME, {
    fields: faresReturnFieldsQuery,
    filter: calendarMonthFaresFilterQuery(destination, days, departure)
  }))
}

export const getMonthlyFaresByDestinationAndStay = (host: string, token: string, destination: string, days: number) => {
   const client = createRestClient(host, token)
   return client.request(aggregate(FARES_COLLECTION_NAME, calendarMonthsFilterQuery(destination, days)))
}