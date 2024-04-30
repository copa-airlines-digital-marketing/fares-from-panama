import type { QueryFields } from "@directus/sdk";
import { iconQueryFields } from "./icon";
import { linksQueryFields } from "./links";

export const navigationQueryFields: QueryFields<Schema, Navigation> = [
  'name',
  {'icon': iconQueryFields},
  {'translations': [
    'title',
    {'links': [
      'title',
      'opens_in',
      {'icon_override': iconQueryFields},
      {'links_url': linksQueryFields}
    ]}
  ]}
]