import { readItems, type QueryDeep, type QueryFields } from "@directus/sdk"
import { z } from "zod"
import { countryReturnFieldsQuery, countryReturnSchema, getCountryDeepFilter } from "./country"
import { getInterestDeepLanguageFilter, interestReturnFieldsQuery, interestReturnSchema } from "./interest"
import { createRestClient } from "./clients"

export const destinationReturnSchema = z.object({
  iata_code: z.string(),
  main_image: z.string(),
  translations: z.object({
    name: z.string(),
    airport_name: z.string(),
    airtrfx_uri: z.string()
  }).array(),
  country: countryReturnSchema,
  categories: z.object({
    destination_category_id: interestReturnSchema
  }).array()
})

type destinationReturnSchema = z.infer<typeof destinationReturnSchema>

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

export const defaultDestination: destinationReturnSchema = {
  iata_code: 'COPA',
  main_image: 'cdcde722-614e-41a1-801f-c56a4aab06f9',
  translations: [{
    name: 'Copa Airlines',
    airport_name: 'Copa Airlines',
    airtrfx_uri: '/'
  }],
  country: {
    code: 'PA',
    currency_code: 'USD',
    phone_code: '507',
    flag:{
      name: 'Panama',
      code: '',
      category: '',
      image: ''
    },
    translations: [{
      name: 'Panama',
      airtrfx_uri: '/'
    }],
  },
  categories: [{
    destination_category_id: {
      name: 'Categoria',
      translations: [{
        name: 'Categoria',
        airtrfx_uri: '/'
      }]
    }
  }]
}

export const destinationLangDeepFilter = (lang: string): QueryDeep<Schema, Destination> => ({
  translations: {
    _filter: {
      languages_code: {
        _eq: lang
      }
    }
  }
})

export const isDestination = (value: unknown): value is destinationReturnSchema => destinationReturnSchema.safeParse(value).success

export const isDestinationArray = (value: unknown): value is destinationReturnSchema[] => destinationReturnSchema.array().safeParse(value).success

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