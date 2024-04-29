import { readItem, type Query } from "@directus/sdk";
import { createRestClient } from "./clients";
import { sectionQueryFields } from "./section";

type PageFilter = {
  id: string | number
  lang: string
}

const COLLECTION = 'pages'

const getPageItemQuery = (lang: string) : Query<Schema, Pages> => ({
  fields: [
    'id',
    'name',
    'share_image',
    {'translations': [
      'title_tag',
      'meta_description'
    ]},
    {storefronts: [
      {sections: [
        {sections_id: sectionQueryFields}
      ]}
    ]}
  ],
  filter: {
      translations: {
        languages_code: {
          _eq: lang
        },
      }
  }
})

export const getPageData = (host: string, token: string, {id, lang}: PageFilter) => {
  const client = createRestClient(host, token)
  return client.request(readItem(COLLECTION, id, getPageItemQuery(lang)))
}