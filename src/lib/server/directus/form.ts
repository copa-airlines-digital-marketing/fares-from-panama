import type { QueryFields } from "@directus/sdk";

export const formQueryFields: QueryFields<Schema, Form> = [
  'action',
  'method',
  'name',
  'inputs',
  {'translations': [
    'inputs'
  ]}
]