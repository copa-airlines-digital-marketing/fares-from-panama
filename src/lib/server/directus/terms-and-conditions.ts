import type { QueryFields } from "@directus/sdk";

export const termsandconditionsQueryFields: QueryFields<Schema, TermsAndConditions> = [
  'name',
  {'translations': [
    'title',
    'termAndConditions',
  ]}
]