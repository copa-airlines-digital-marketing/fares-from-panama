import type { QueryFields } from "@directus/sdk"

export const ICON_COLLECTION_NAME: keyof Schema = 'icons'

export const allIconsFieldsQuery: QueryFields<Schema, Icon> = [
  'code',
  'category',
  'image',
  'name'
]

