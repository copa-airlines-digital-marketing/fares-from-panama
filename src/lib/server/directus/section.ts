import type { QueryFields } from "@directus/sdk"
import { colorsQueryFields } from "./colors"
import { sectionContentQueryFields } from "./section-content"

//const COLLECTION: keyof Schema = 'sections'

export const sectionQueryFields: QueryFields<Schema, Section> = [
  'name',
  'section_id',
  'landmark',
  'horizontal_behaviour',
  'content_spacing',
  'content_horizontal_alignment',
  'content_horizontal_distribution',
  'content_vertical_alignment',
  'content_vertical_distribution',
  {'background_color': colorsQueryFields},
  {'section_content': sectionContentQueryFields}
]