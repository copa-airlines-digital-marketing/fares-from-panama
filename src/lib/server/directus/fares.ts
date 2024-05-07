import { aggregate, readItems, type AggregationOptions, type QueryFields, type QueryFilter } from "@directus/sdk"
import { createRestClient } from "./clients"
import { formatDate, getYear } from "date-fns"
import { getMonth } from "../utils"

type FaresAggregation = AggregationOptions<Schema, 'viaja_panama_fares'>

type FaresQuery = QueryFilter<Schema, ViajaPanamaFare>

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

const faresDestinationsGroup: FaresAggregation = {
  aggregate:{},
  groupBy: [
    'destination'
  ],
  query: {
    filter: {
      price: {
        _neq: '9999999'
      }
    }
  }
}

const faresDaysGroup: FaresAggregation = {
  aggregate:{},
  groupBy: [
    'days'
  ]
}

const calendarMonthFaresFilterQuery = (destination: string, days: number, departure: Date): FaresQuery => ({
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

const calendarMonthsFilterQuery = (destination: string, days: number): FaresAggregation => ({
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

const histogramMothsFilterQuery = (days: number): FaresAggregation => ({
  aggregate: {
    min: "price"
  },
  groupBy: [
    'days',
    'month(departure)',
    'year(departure)'
  ],
  query: {
    filter: {
      days: {_eq: days}
    }
  }
})

const histogramDaysFilterQuery = (days: number, departure: Date): FaresAggregation => ({
  aggregate: {
    min: "price"
  },
  groupBy: [
    'days',
    'departure'
  ],
  query: {
    filter: {
      _and: [
        {days: {_eq: days}},
        {'month(departure)': {_eq: getMonth(departure)}},
        {'year(departure)': {_eq: getYear(departure)}}
      ]
    }
  }
})

const histogramFaresQuery = (days: number, departure: Date): FaresQuery => ({
  _and:[
    {days: {_eq: days}},
    {departure: {_eq: formatDate(departure, 'YYYY-mm-dd')}},
  ]
})

/* const budgetFaresQuery = (days: number, = )
 */

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

export const getCalendarFares = (host: string, token: string, destination: string, days: number, departure: Date) => {
  const client = createRestClient(host, token)
  return client.request(readItems(FARES_COLLECTION_NAME, {
    fields: faresReturnFieldsQuery,
    filter: calendarMonthFaresFilterQuery(destination, days, departure)
  }))
}

export const getCalendarMonths = (host: string, token: string, destination: string, days: number) => {
   const client = createRestClient(host, token)
   return client.request(aggregate(FARES_COLLECTION_NAME, calendarMonthsFilterQuery(destination, days)))
}

export const getHistogramMonths = (host: string, token: string, days: number) => {
  const client = createRestClient(host, token)
  return client.request(aggregate(FARES_COLLECTION_NAME, histogramMothsFilterQuery(days)))
}

export const getHistogramDatesOfMonth = (host: string, token: string, days: number, departure: Date) => {
  const client = createRestClient(host, token)
  return client.request(aggregate(FARES_COLLECTION_NAME, histogramDaysFilterQuery(days, departure)))
}

export const getHistogramFares = (host: string, token: string, days: number, departure: Date) => {
  const client = createRestClient(host, token)
  return client.request(readItems(FARES_COLLECTION_NAME, {
    fields: faresReturnFieldsQuery,
    filter: histogramFaresQuery(days, departure)
  }))
}