import type { QueryFields } from "@directus/sdk"
import { z } from "zod"
import { countryReturnFieldsQuery, countryReturnSchema } from "./country"
import { interestReturnFieldsQuery, interestReturnSchema } from "./interest"

export const destinationReturnSchema = z.object({
  iata_code: z.string(),
  main_image: z.string(),
  translations: z.object({
    name: z.string(),
    airport_name: z.string(),
    airtrfx_uri: z.string()
  }).array(),
  country: countryReturnSchema,
  categories: interestReturnSchema
})

type destinationReturnSchema = z.infer<typeof destinationReturnSchema>

export const DESTINATION_COLLECTION_NAME = 'destinations'

export const destinationReturnFieldsQuery: QueryFields<Schema, Destination> = [
  'status',
  'iata_code',
  'main_image',
  {'translations': [
    'name',
    'airport_name',
    'airtrfx_uri'
  ]},
  {'country': countryReturnFieldsQuery},
  {'categories': [
    {'destination_category_id': interestReturnFieldsQuery}
  ]}
]

export const isCountry = (value: unknown): value is destinationReturnSchema => destinationReturnSchema.safeParse(value).success

export const isCountryArray = (value: unknown): value is destinationReturnSchema[] => destinationReturnSchema.array().safeParse(value).success