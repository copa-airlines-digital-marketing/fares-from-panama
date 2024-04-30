import type { QueryFields } from "@directus/sdk";
import { iconQueryFields } from "./icon";

export const linksQueryFields: QueryFields<Schema, Link> = [
  'url',
  'name',
  {'icon': iconQueryFields}
]