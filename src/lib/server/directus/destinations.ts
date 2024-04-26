import { readItems, type QueryDeep, type QueryFields } from "@directus/sdk"
import { countryReturnFieldsQuery, getCountryDeepFilter } from "./country"
import { getInterestDeepLanguageFilter, interestReturnFieldsQuery } from "./interest"
import { createRestClient } from "./clients"

export const DESTINATION_COLLECTION_NAME: keyof Schema = 'destinations'

export const destinationReturnFieldsQuery: QueryFields<Schema, Destination> = [
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

export const destinationLangDeepFilter = (lang: string): QueryDeep<Schema, Destination> => ({
  translations: {
    _filter: {
      languages_code: {
        _eq: lang
      }
    }
  }
})

export const getAllDestinationsInLanguage = (host: string, token: string, lang: string) => {
  const client = createRestClient(host, token)
  return client.request(readItems(DESTINATION_COLLECTION_NAME, {
    fields: destinationReturnFieldsQuery,
    deep: {
      ...destinationLangDeepFilter(lang),
      categories: {
        destination_category_id: getInterestDeepLanguageFilter(lang)
      },
      country: getCountryDeepFilter(lang),
    }
  })) 
}