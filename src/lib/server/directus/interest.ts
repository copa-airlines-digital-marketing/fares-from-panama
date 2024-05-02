import type { QueryDeep, QueryFields } from "@directus/sdk"

export const INTEREST_COLLECTION_NAME: keyof Schema = 'destination_category'

export const interestReturnFieldsQuery: QueryFields<Schema, DestinationCategory> = [
  'name',
  'image',
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