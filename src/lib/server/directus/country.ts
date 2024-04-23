import type { QueryFields } from "@directus/sdk"
import { allIconsFieldsQuery, iconReturnSchema } from "./icon"
import { z } from "zod"

export const countryReturnSchema = z.object({
  code: z.string(),
  currency_code: z.string(),
  phone_code: z.string(),
  translations: z.object({
    name: z.string(),
    airtrfx_uri: z.string()
  }).array(),
  flag: iconReturnSchema
})

type countryReturnSchema = z.infer<typeof countryReturnSchema>

export const COUNTRY_COLLECTION_NAME: keyof Schema = 'countries'

export const countryReturnFieldsQuery: QueryFields<Schema, Country> = [
  'code',
  'currency_code',
  'phone_code',
  {'translations': [
    'name',
    'airtrfx_uri'
  ]},
  {'flag': allIconsFieldsQuery}
]

export const isCountry = (value: unknown): value is countryReturnSchema => countryReturnSchema.safeParse(value).success

export const isCountryArray = (value: unknown): value is countryReturnSchema[] => countryReturnSchema.array().safeParse(value).success