import { readItems, type QueryItem } from "@directus/sdk";
import { createRestClient } from "./clients";

const COLLECTION = 'collection_updated'

const getContentUpdateItemQuery = (id: string) : QueryItem<Schema, CollectionUpdated> => ({
  fields: [
    'collection',
    'lastUpdate'
  ],
  filter: {
    collection: {
      _eq: id
    }
  }
})

export const getCollectionUpdatedItem = (id: string, host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(readItems(COLLECTION, getContentUpdateItemQuery(id)))
}