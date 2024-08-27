import { z } from "zod"

const collectionIDSchema = z.number().or(z.string())

const baseCollectionSchema = z.object({
  id: collectionIDSchema,
  date_created: z.string(),
  date_updated: z.string(),
  status: z.string(),
  user_created: z.string(),
  user_updated: z.string()
})

const noStatusBaseCollectionSchema = baseCollectionSchema.omit({ status: true })

const noIdBaseCollecttionSchema = baseCollectionSchema.omit({ id: true })

const updateOnlyBaseCollectionSchema = baseCollectionSchema.omit({ id: true, status: true })

const codeNameObjectSchema = z.object({
  code: z.string(),
  name: z.string()
})

type CollectionID = z.infer<typeof collectionIDSchema>

type BaseCollection = z.infer<typeof baseCollectionSchema>

type NoStatusBaseCollection = z.infer<typeof noStatusBaseCollectionSchema>

type NoIdBaseCollecttion = z.infer<typeof noIdBaseCollecttionSchema>

type UpdateOnlyBaseCollection = z.infer<typeof updateOnlyBaseCollectionSchema>

type CodeNameObject = z.infer<typeof codeNameObjectSchema>

function isCollectionId(value: unknown): value is CollectionID {
  return collectionIDSchema.safeParse(value).success
}

function isCollectionIdArray(value: unknown): value is CollectionID[] {
  return collectionIDSchema.array().safeParse(value).success
}

export {
  collectionIDSchema,
  baseCollectionSchema,
  noStatusBaseCollectionSchema,
  noIdBaseCollecttionSchema,
  updateOnlyBaseCollectionSchema,
  codeNameObjectSchema,
  isCollectionId,
  isCollectionIdArray,
}

export type { CollectionID, BaseCollection, NoStatusBaseCollection, NoIdBaseCollecttion, UpdateOnlyBaseCollection, CodeNameObject }