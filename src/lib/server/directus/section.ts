import type { QueryFields } from "@directus/sdk"
import { colorsQueryFields } from "./colors"
import { carrouselQueryFields } from "./carrousel"
import { copyrightsQueryFields } from "./copyrights"
import { faremoduleQueryFields } from "./fare-module"
import { followbuttonsQueryFields } from "./follow-buttons"
import { iconQueryFields } from "./icon"
import { formQueryFields } from "./form"
import { logoQueryFields } from "./logos"
import { navigationQueryFields } from "./navigation"
import { termsandconditionsQueryFields } from "./terms-and-conditions"
import { textcontentQueryFields } from "./text-content"

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
  {'section_content': [
    'collection',
    'component_name',
    'display',
    'horizontal_alignment',
    'theme',
    'vertical_alignment',
    {'item': {
      'carrousel': carrouselQueryFields,
      'copyrights': copyrightsQueryFields,
      'fare_module': faremoduleQueryFields,
      'follow_buttons': followbuttonsQueryFields,
      'form': formQueryFields,
      'icons': iconQueryFields,
      'logos': logoQueryFields,
      'terms_and_conditions': termsandconditionsQueryFields,
      'Text_Content': textcontentQueryFields,
    }}
  ]}
] as const