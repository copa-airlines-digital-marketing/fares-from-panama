import { readItem, type Query } from "@directus/sdk";
import { createRestClient } from "./clients";
import { sectionQueryFields } from "./section";
import { getlanguageCodeFilter } from "$lib/public/utils";

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
      'storefronts_code',
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
  },
  deep: {
    translations: {
      '_filter': {
        'languages_code': {
          code: {
            '_eq': lang
          }
        }
      }
    },
    storefronts: {
      '_filter': {
        'storefronts_code': {
          'code': {
            '_eq': 'gs'
          }
        },
      },
      'sections': {
        sections_id: {
          section_content: {
            "item:copyrights": {
              translations: getlanguageCodeFilter('es', lang),
            },
            "item:Text_Content": {
              translations: getlanguageCodeFilter('es', lang),
            },
            "item:navigation": {
              translations: getlanguageCodeFilter('es', lang),
            },
            "item:terms_and_conditions": {
              translations: getlanguageCodeFilter('es', lang),
            },
            "item:fare_module": {
              translations: getlanguageCodeFilter('es', lang)
            }
          }
        }
      }
    }
  }
})

export const getPageData = (host: string, token: string, {id, lang}: PageFilter) => {
  const client = createRestClient(host, token)
  return client.request(readItem(COLLECTION, id, getPageItemQuery(lang)))
}