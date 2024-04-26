import { z } from "zod"

const collectionSchema = z.object({
  collection: z.string(),
  lastUpdate: z.string()
})

export type CollectionUpdatedSchema = z.infer<typeof collectionSchema>

export const isCollectionUpdatedRow = (value: unknown): value is CollectionUpdatedSchema => collectionSchema.safeParse(value).success

export const isCollectionUpdatedArray = (value: unknown): value is CollectionUpdatedSchema[] => collectionSchema.array().safeParse(value).success

export const extractLastUpdated = (content: CollectionUpdatedSchema[]) => content[0].lastUpdate