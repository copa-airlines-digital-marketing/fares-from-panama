import type { QueryFields } from "@directus/sdk";

// const COLLECTION = sections_section_content

export const sectionContentQueryFields: QueryFields<Schema, SectionContent> = [
  'collection',
  'component_name',
  'display',
  'horizontal_alignment',
  {'item': [
    {}
  ]},
  'theme',
  'vertical_alignment'
]