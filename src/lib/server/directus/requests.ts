import { aggregate, readItem, readItems, type AggregationOptions, type AllCollections, type Query, type QueryItem, type RegularCollections } from "@directus/sdk";
import { curry } from "ramda";
import type { CMMarketingDirectusClient } from "./clients";

export const getSingleItem = curry(async <Collection extends RegularCollections<CMMarketingDirectusSchema>>(collection: RegularCollections<CMMarketingDirectusSchema>, id: string, query: QueryItem<CMMarketingDirectusSchema, Collection>, client: CMMarketingDirectusClient) => {
  return await client.request(readItem(collection, id, query))
})

export const getMultipleItems = curry(async <Collection extends RegularCollections<CMMarketingDirectusSchema>>(collection: RegularCollections<CMMarketingDirectusSchema>, query: Query<CMMarketingDirectusSchema, Collection>, client: CMMarketingDirectusClient) => {
  return await client.request(readItems(collection, query))
})

export const getAggregatedItems = curry(async <Collection extends AllCollections<CMMarketingDirectusSchema>>(collection: keyof CMMarketingDirectusSchema, options: AggregationOptions<CMMarketingDirectusSchema, Collection>, client: CMMarketingDirectusClient) => {
  return await client.request(aggregate(collection, options))
})