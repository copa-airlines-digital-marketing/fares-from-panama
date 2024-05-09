import { readItems, type QueryDeep, type QueryFields, type QueryFilter } from "@directus/sdk"
import { createRestClient } from "./clients"

export const INTEREST_COLLECTION_NAME: keyof Schema = 'destination_category'

export const interestReturnFieldsQuery: QueryFields<Schema, DestinationCategory> = [
  'name',
  'image',
  {'translations': [
    'name',
    'airtfx_uri'
  ]}
]

const interestTranslationFilter = (lang: string): QueryFilter<Schema, DestinationCategory> => ({
  translations: {
    languages_code: {
      _eq: lang
    }
  }
})

export const getInterestDeepLanguageFilter = (lang: string): QueryDeep<Schema, Country> => ({
  translations: {
    _filter: {
      languages_code: {
        _eq: lang
      }
    }
  }
})

export const getInterestst = (host: string, token: string, lang: string) => {
  const client = createRestClient(host, token)
  return client.request(readItems(INTEREST_COLLECTION_NAME, {
    fields: [...interestReturnFieldsQuery, 'destinations'],
    filter: interestTranslationFilter(lang)
  }))
}