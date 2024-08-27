import { z } from "zod"
import { type BaseCollection, type CollectionID } from ".."
import { type Destination } from "../destination"
import { destinationCategoryTranslationSchema, type DestinationCategoryTranslation } from "../category-translations"

type DestinationCategory = BaseCollection & {
  name?: string
  image: string | null
  translations: DestinationCategoryTranslation[]
}

const destinationCategorySchema: z.ZodType<DestinationCategory> = z.object({
  name: z.optional(z.string()),
  image: z.null().or(z.string()),
  translations: z.optional(destinationCategoryTranslationSchema.array()),
})

export {
  destinationCategorySchema,
  type DestinationCategory
}