import type { QueryFields } from "@directus/sdk";
import { linksQueryFields } from "./links";

export const followbuttonsQueryFields: QueryFields<Schema, FollowButtons> = [
  'name',
  {'translations': [
    'title',
    {'social_network': [
      {'links_url': linksQueryFields}
    ]}
  ]}
]