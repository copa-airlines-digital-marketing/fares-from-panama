import type { Query } from "@directus/sdk";
import { getItems } from "./cms";


export const getPage = async function(host:string, token: string, collection: string, id: string, item: Query<Directus.Schema, Directus.Site>){
  const requestSettings: Directus.Params<Directus.Schema, Directus.Site> = {
    host,
    token,
    collection,
    id,
    item,
  }

  const request = await getItems({...requestSettings, item})

  return request
}