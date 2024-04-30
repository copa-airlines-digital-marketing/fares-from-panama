import type { QueryFields } from "@directus/sdk";
import { iconQueryFields } from "./icon";

export const textcontentQueryFields: QueryFields<Schema, TextContent> = [
  'name',
  {'icon': iconQueryFields},
  {'translations': [
    'title',
    'description',
    'media',
    'embed_media',
    'call_to_actions'
  ]}
]