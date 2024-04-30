import type { QueryFields } from "@directus/sdk";

export const logoQueryFields: QueryFields<Schema, Logo> = [
  'code',
  'image',
  'name'
]