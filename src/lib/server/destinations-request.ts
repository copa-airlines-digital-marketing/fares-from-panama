import { getlanguageCodeFilter } from "$lib/public/utils";
import type { Query } from "@directus/sdk";

export type DestinationBuilderFunctionParams = {
  defaultLang: string
  lang?: string
}

export const getDestinationsQuery = ({defaultLang, lang}: DestinationBuilderFunctionParams) => {
  const query: Query<Directus.Schema, Directus.Destination> = {
  fields: [
    'iata_code',
    'main_image',
    {translations: ['name']},
    {categories: [
      {destination_category_id:[{translations:['name']}]}
    ]},
    {'country': [
      {translations: ['name']}
    ]}
  ],
  deep: {
    translations: getlanguageCodeFilter(defaultLang, lang),
    categories: {
      translations: getlanguageCodeFilter(defaultLang, lang)
    },
    country: {
      translations: getlanguageCodeFilter(defaultLang, lang)
    }
  }
}
return query 
}