import type { QueryDeep, QueryFields } from "@directus/sdk"
import { iconQueryFields } from "./icon"

export const COUNTRY_COLLECTION_NAME: keyof Schema = 'countries'

export const countryReturnFieldsQuery: QueryFields<Schema, Country> = [
  'code',
  'currency_code',
  'phone_code',
  {'translations': [
    'name',
    'airtrfx_uri'
  ]},
  {'flag': iconQueryFields}
]

export const getCountryDeepFilter = (lang: string): QueryDeep<Schema, Country> => ({
  translations: {
    _filter: {
      languages_code: {
        _eq: lang
      }
    }
  }
})