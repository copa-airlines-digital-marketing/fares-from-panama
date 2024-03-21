import type { Query } from "@directus/sdk"

export type PageQueryBuilderFunctionParams = {
  id: number
  defaultLang: string, 
  defaultStorefront: string, 
  lang?: string, 
  storefront?: string
}

const getlanguageCodeFilter = (defaultLang: string, lang?: string) => {
  return {
    _filter: {
      languages_code: {
        _eq: lang || defaultLang
      }
    }
  }
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


export const getPageQuery = ({id, defaultLang, defaultStorefront, lang, storefront}: PageQueryBuilderFunctionParams) => {
  const query: Query<Directus.Schema, Directus.Site> = {
    fields: [
      "favIcon",
      {
        pages: [
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
                      'section_id',
                      {
                        section_content: [
                          'collection',
                          {
                            item: {
                              Text_Content: [
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
                              logos: ['code'],
                              icon: ['code'],
                              form: ['action', 'inputs'],
                              navigation: [
                                'icon', {
                                'translations': [
                                  'languages_code',
                                  'title',
                                  'links'
                                ]
                              }],
                              carrousel: ['autoSlide', 'autoSlideDelayMS', 'slides'],
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
        ]
      }
    ],
    deep: {
      pages: {
        _filter: {
          id: {
            _eq: id
          }
        },
        translations: getlanguageCodeFilter(defaultLang, lang),
        storefronts: {
          ...getStorefrontsCodeFilter(defaultStorefront, storefront),
          sections: {
            sections_id: {
              section_content: {
                item: {
                  
                }
              }
            }
          }
        }
      },
    }
  }

  return query
}