import { z } from "zod"
import { collectionIDSchema, type BaseCollection, type CollectionID } from ".."
import { destinationSchema, type Destination } from "../destination"
import { destinationCategoryTranslationSchema, type DestinationCategoryTranslation } from "../category-translations"

type DestinationCategory = BaseCollection & {
  name: string
  image: string | null
  translations?: CollectionID[] | DestinationCategoryTranslation[]
  destinations?: CollectionID[] | Destination[]
}

const destinationCategorySchema: z.ZodType<DestinationCategory> = z.object({
  name: z.string(),
  image: z.null().or(z.string()),
  translations: z.optional(collectionIDSchema.array().or(z.lazy(() => destinationCategoryTranslationSchema ))),
  destinations: z.optional(collectionIDSchema.array().or(z.lazy(() => destinationSchema )))
})

export {
  destinationCategorySchema,
  type DestinationCategory
}