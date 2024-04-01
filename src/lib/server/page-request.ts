import { getlanguageCodeFilter } from "$lib/public/utils"
import type { Query } from "@directus/sdk"

export type PageQueryBuilderFunctionParams = {
  id: number
  defaultLang: string, 
  defaultStorefront: string, 
  lang?: string, 
  storefront?: string
}

const getStorefrontsCodeFilter = (defaultStorefront: string, storefront?: string) => {
  return {
    _filter: {
      storefronts_code: {
        _eq: storefront || defaultStorefront
      }
    }
  }
}

export const getPageQuery = ({defaultLang, defaultStorefront, lang, storefront}: PageQueryBuilderFunctionParams) => {
  const query: Query<Directus.Schema, Directus.Page> = {
    fields: [ 
      "name",
      "share_image",
      {
        translations: [
        'languages_code',
        'title_tag',
        'meta_description'
      ]},
      {
        storefronts: [
          'storefronts_code',
          {
            sections:[
              {
                sections_id:[
                  'content_horizontal_alignment',
                  'content_horizontal_distribution',
                  'content_vertical_alignment',
                  'content_vertical_distribution',
                  'content_spacing',
                  'horizontal_behaviour',
                  'landmark',
                  'section_id',
                  {'background_color':[
                    'name'
                  ]},
                  {
                    section_content: [
                      'collection',
                      'component_name',
                      'display',
                      'horizontal_alignment',
                      'theme',
                      'vertical_alignment',
                      {
                        item: {
                          carrousel: ['name','autoSlide', 'autoSlideDelayMS', 'slides'],
                          copyrights: [
                            'name',
                            {translations: ['copyright']}
                          ],
                          icon: ['name','code'],
                          follow_buttons: [{translations: [
                            'languages_code',
                            'title',
                            {social_network: [
                              {"links_url":[
                                'name',
                                'url',
                                'opens_in',
                                {'icon':['code']}
                              ]},
                            ]}
                          ]}],
                          form: ['action', 'method', 'inputs'],
                          logos: ['name', 'code'],
                          navigation: [
                            'name',
                            {icon: ['code']}, 
                            {translations: [
                              'languages_code',
                              'title',
                              {links: [
                                'title',
                                'opens_in',
                                {icon_override: ['code']},
                                {links_url: [
                                  'url',
                                ]}
                              ]}
                            ]
                          }],
                          Text_Content: [
                            'name',
                            'icon', 
                            'icon_from_library', 
                            {
                              'translations': [
                                'languages_code',
                                'call_to_actions',
                                'description',
                                'embed_media',
                                'media',
                                'title'
                              ]
                            }
                          ],
                          terms_and_conditions: [
                            {translations: [
                              'title',
                              'termAndConditions'
                            ]}
                          ],
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    deep: {
      translations: getlanguageCodeFilter(defaultLang, lang),
      storefronts: {
        ...getStorefrontsCodeFilter(defaultStorefront, storefront),
        sections: {
          sections_id: {
            section_content: {
              "item:copyrights": {
                translations: getlanguageCodeFilter(defaultLang, lang),
              },
              "item:Text_Content": {
                translations: getlanguageCodeFilter(defaultLang, lang),
              },
              "item:navigation": {
                translations: getlanguageCodeFilter(defaultLang, lang),
              },
              "item:terms_and_conditions": {
                translations: getlanguageCodeFilter(defaultLang, lang),
              },
            }
          }
        }
      }
    },
  }

  return query
}