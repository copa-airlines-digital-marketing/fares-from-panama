import { aggregate, readItems, type AggregationOptions, type QueryFields, type QueryFilter } from "@directus/sdk"
import { createRestClient } from "./clients"
import { formatDate } from "date-fns"

type FaresAggregation = AggregationOptions<Schema, 'viaja_panama_fares'>

type FaresQuery = QueryFilter<Schema, ViajaPanamaFare>

const FARES_COLLECTION_NAME: keyof Schema = 'fares_viaja_panam'

const faresReturnFieldsQuery: QueryFields<Schema, ViajaPanamaFare> = [
  'destination',
  'days',
  'departure',
  'return',
  'fare',
  'taxes',
  'price',
  'seats',
  'score',
  'updated_at'
]

const faresDestinationsGroup: FaresAggregation = {
  aggregate:{
    min: ['price', 'updated_at'],
    max: 'score'
  },
  groupBy: [
    'destination',
    'days'
  ],
  query: {
    filter: {
      price: {
        _neq: 9999999
      }
    },
    limit: -1
  }
}

const faresDaysGroup: FaresAggregation = {
  aggregate:{
    min: 'updated_at'
  },
  groupBy: [
    'days'
  ]
}

const minPriceByDate: FaresAggregation = {
  aggregate: {
    min: ['price', 'updated_at']

  },
  groupBy: [
    'days',
    'departure'
  ],
  query:{
    limit: -1
  }
}

const calendarMonthFaresFilterQuery = (destination: string): FaresQuery => ({
  _and:[
    {
      destination: {
        _eq: destination
      }
    }
  ]
})

const histogramFaresQuery = (days: number, departure: Date): FaresQuery => ({
  _and:[
    {days: {_eq: days}},
    {departure: {_eq: formatDate(departure, 'YYYY-mm-dd')}},
  ]
})

const getDestinationsOfFares = (host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(aggregate(FARES_COLLECTION_NAME, faresDestinationsGroup))
}

const getCalendarFares = (host: string, token: string, destination: string) => {
  const client = createRestClient(host, token)
  return client.request(readItems(FARES_COLLECTION_NAME, {
    fields: faresReturnFieldsQuery,
    filter: calendarMonthFaresFilterQuery(destination),
    limit: -1
  }))
}

const getHistogramFares = (host: string, token: string, days: number, departure: Date) => {
  const client = createRestClient(host, token)
  return client.request(readItems(FARES_COLLECTION_NAME, {
    fields: faresReturnFieldsQuery,
    filter: histogramFaresQuery(days, departure),
    limit: -1
  }))
}

const getDaysOfFare = (host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(aggregate(FARES_COLLECTION_NAME, faresDaysGroup))
}

const getLowestFareByDayAndDate = (host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(aggregate(FARES_COLLECTION_NAME, minPriceByDate))
}

export {
  getDaysOfFare,
  getDestinationsOfFares,
  getCalendarFares,
  getLowestFareByDayAndDate,
  getHistogramFares,
}