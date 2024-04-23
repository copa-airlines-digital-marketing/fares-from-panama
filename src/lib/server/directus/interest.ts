import type { QueryDeep, QueryFields } from "@directus/sdk"
import { z } from "zod"

export const interestReturnSchema = z.object({
  name: z.string(),
  translations: z.object({
    name: z.string(),
    airtrfx_uri: z.string()
  }).array()
})

type interestReturnSchema = z.infer<typeof interestReturnSchema>

export const INTEREST_COLLECTION_NAME: keyof Schema = 'destination_category'

export const interestReturnFieldsQuery: QueryFields<Schema, DestinationCategory> = [
  'name',
  {'translations': [
    'name',
    'airtfx_uri'
  ]}
]

export const getInterestDeepLanguageFilter = (lang: string): QueryDeep<Schema, Country> => ({
  translations: {
    _filter: {
      languages_code: {
        _eq: lang
      }
    }
  }
})


export const isCountry = (value: unknown): value is interestReturnSchema => interestReturnSchema.safeParse(value).success

export const isCountryArray = (value: unknown): value is interestReturnSchema[] => interestReturnSchema.array().safeParse(value).success