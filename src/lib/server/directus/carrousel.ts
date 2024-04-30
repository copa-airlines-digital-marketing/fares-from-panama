import type { QueryFields } from "@directus/sdk";


export const carrouselQueryFields: QueryFields<Schema, Carrousel> = [
  'name',
  'description',
  'autoSlide',
  'autoSlideDelayMS',
  'slides'
]