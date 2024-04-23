import { readItems, type QueryItem } from "@directus/sdk";
import { createRestClient } from "./clients";
import { z } from "zod";

const COLLECTION = 'collection_updated'

const collectionSchema = z.object({
  collection: z.string(),
  lastUpdated: z.string()
})

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

export const isCollectionUpdatedRow = (value: unknown): value is CollectionUpdated => collectionSchema.safeParse(value).success

export const isCollectionUpdatedArray = (value: unknown): value is CollectionUpdated[] => collectionSchema.array().safeParse(value).success

export const getCollectionUpdatedItem = (id: string, host: string, token: string) => {
  const client = createRestClient(host, token)
  return client.request(readItems(COLLECTION, getContentUpdateItemQuery(id)))
}