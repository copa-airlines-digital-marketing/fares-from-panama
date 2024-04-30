import type { QueryFields } from "@directus/sdk"

export const ICON_COLLECTION_NAME: keyof Schema = 'icons'

export const iconQueryFields: QueryFields<Schema, Icon> = [
  'code',
  'category',
  'image',
  'name'
]

