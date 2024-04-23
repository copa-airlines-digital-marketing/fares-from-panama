import { aggregate, readItems, type AggregationOptions, type QueryFields } from "@directus/sdk"
import { z } from "zod"
import { createRestClient } from "./clients"

export const faresReturnSchema = z.object({
  destination: z.string(),
  days: z.number(),
  departure: z.string(),
  return: z.string(),
  fare: z.string(),
  taxes: z.string(),
  price: z.string(),
  seats: z.number(),
  score: z.number()
})

export const fareDestinationReturnSchema = faresReturnSchema.pick({destination: true})

type faresReturnSchema = z.infer<typeof faresReturnSchema>

type fareDestinationReturnSchema = z.infer<typeof fareDestinationReturnSchema>

export const FARES_COLLECTION_NAME: keyof Schema = 'viaja_panama_fares'

export const faresReturnFieldsQuery: QueryFields<Schema, ViajaPanamaFares> = [
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

export const faresDetinationsGroup: AggregationOptions<Schema, 'viaja_panama_fares'> = {
  aggregate:{},
  groupBy: [
    'destination'
  ]
}

export const defaultFare: faresReturnSchema = {
  destination: 'COPA',
  days: -1,
  departure: '1944-06-21',
  return: 'undefined',
  fare: '0',
  taxes: '0',
  price: '0',
  seats: 1,
  score: 1
}

export const isViajaPanamaFare = (value: unknown): value is faresReturnSchema => faresReturnSchema.safeParse(value).success

export const isViajaPanamaFareArray = (value: unknown): value is faresReturnSchema[] => faresReturnSchema.array().safeParse(value).success

export const isViajaPanamaFareDestinationArray = (value: unknown): value is fareDestinationReturnSchema[] => fareDestinationReturnSchema.array().safeParse(value).success

export const getAllFares = (host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(readItems(FARES_COLLECTION_NAME, {
    fields: faresReturnFieldsQuery,
    limit: -1
  })) 
}

export const getDestinationsOfFares = (host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(aggregate(FARES_COLLECTION_NAME, faresDetinationsGroup))
}