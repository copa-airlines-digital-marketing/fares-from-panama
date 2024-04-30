import type { QueryFields } from "@directus/sdk";


export const copyrightsQueryFields: QueryFields<Schema, Copyrights> = [
  'name',
  {'translations': [
    'copyright'
  ]}
]