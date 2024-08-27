import { z } from "zod"
import { collectionIDSchema, type CollectionID } from ".."
import { destinationCategorySchema, type DestinationCategory } from "../category"
import { languageSchema, type Language } from "../language"

type DestinationCategoryTranslation = {
  id: number
  name: string
  airtfx_uri: string
  destination_category_id: CollectionID | DestinationCategory
  languages_code: CollectionID | Language
}

const destinationCategoryTranslationSchema: z.ZodType<DestinationCategoryTranslation> = z.object({
  id: z.number(),
  name: z.string(),
  airtrfx_uri: z.string(),
  destination_category_id: collectionIDSchema.or(z.lazy(() => destinationCategorySchema)),
  languages_code: collectionIDSchema.or(languageSchema)
})

export {
  destinationCategoryTranslationSchema,
  type DestinationCategoryTranslation
}