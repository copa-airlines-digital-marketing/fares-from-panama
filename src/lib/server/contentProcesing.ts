import type { Query } from "@directus/sdk";
import { getItems } from "./cms";


export const getPage = async function(host:string, token: string, collection: string, id: number, item: Query<Directus.Schema, Directus.Page>){
  const requestSettings: Directus.Params<Directus.Schema, Directus.Page> = {
    host,
    token,
    collection,
    id,
    item,
  }

  const request = await getItems({...requestSettings, item})

  return request
}

export const getDestinations = async function (host: string, token: string, collection: string, items: Query<Directus.Schema, Directus.Destination>) {
  const requestSettings: Directus.Params<Directus.Schema, Directus.Destination> = {
    host,
    token,
    collection
  }

  const request = await getItems({...requestSettings, items})

  return request
}