import type { Query } from "@directus/sdk";
import cms from "./cms";


export default async function(host:string, token: string, collection: string, id: string, lang: string, storfront: string, page: string){
  const requestSettings: Directus.Params<Directus.ContentQuery, Directus.Content> = {
    host,
    token,
    collection,
    id,
  }

  const item: Query<Directus.ContentQuery, Directus.Content> = {
    fields: [
      "favIcon",
      {
        pages: [
          "name",
          "share_image",
          "translations.*",
          "storefronts.*"
        ]
      }
    ],
    deep: {
      { pages: {
          _filter: {
            id: {
              _eq: page
            }
          }
        }
      }
        pages: {
          _
        }
    }
  }

  const request = await cms({...requestSettings, item})

  console.log(request)
}