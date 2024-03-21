import { createDirectus, staticToken, rest, readItem, readItems } from "@directus/sdk";

// Gets the content of the site
export const getItems = async function<Schema, Item>({host, token, collection, id, item, items}: Directus.Params<Schema, Item>){

  const client = createDirectus(host).with(staticToken(token)).with(rest())

  if ((item && !id)) return {error: 'When querying an specific item, id is required'}

  try{
    if (id)
    return await client.request(readItem(collection, id, item));

    if (items)
    return await client.request(readItems(collection, items));

    return {error: 'To query a collection, item or items are required'}
  }catch (e) {
    return e
  }
}



