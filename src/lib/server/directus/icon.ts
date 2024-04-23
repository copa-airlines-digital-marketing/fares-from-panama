import type { QueryFields } from "@directus/sdk"
import { z } from "zod"

export const iconReturnSchema = z.object({
  name: z.string(),
  category: z.string(),
  image: z.string(),
  code: z.string()
})

type IconReturnSchema = z.infer<typeof iconReturnSchema>

export const ICON_COLLECTION_NAME: keyof Schema = 'icons'

export const allIconsFieldsQuery: QueryFields<Schema, Icon> = [
  'code',
  'category',
  'image',
  'name'
]

export const isIcon = (value: unknown): value is IconReturnSchema => iconReturnSchema.safeParse(value).success

export const isIconArray = (value: unknown): value is IconReturnSchema[] => iconReturnSchema.array().safeParse(value).success
