import type { QueryFields } from "@directus/sdk";

//const COLLECTION = 'colors'

export const colorsQueryFields: QueryFields<Schema, Colors> = [
  'name',
  'hex'
]