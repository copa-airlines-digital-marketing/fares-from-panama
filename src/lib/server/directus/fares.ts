import { aggregate, readItems, type AggregationOptions, type QueryFields } from "@directus/sdk"
import { createRestClient } from "./clients"

export const FARES_COLLECTION_NAME: keyof Schema = 'viaja_panama_fares'

export const faresReturnFieldsQuery: QueryFields<Schema, ViajaPanamaFare> = [
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

export const faresDestinationsGroup: AggregationOptions<Schema, 'viaja_panama_fares'> = {
  aggregate:{},
  groupBy: [
    'destination'
  ]
}

export const faresDaysGroup: AggregationOptions<Schema, 'viaja_panama_fares'> = {
  aggregate:{},
  groupBy: [
    'days'
  ]
}

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