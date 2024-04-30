import type { QueryFields } from "@directus/sdk";

export const faremoduleQueryFields: QueryFields<Schema, FareModule> = [
  'name',
  {'translations': [
    'labels'
  ]}
]