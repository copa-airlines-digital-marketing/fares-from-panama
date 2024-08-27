import { z } from "zod"
import { collectionIDSchema, type CollectionID } from ".."
import { destinationSchema, type Destination } from "../destination"
import { destinationCategorySchema, type DestinationCategory } from "../category"

type DestinationCategories = {
  id: number
  destinations_iata_code: CollectionID  | Destination
  destination_category_id: CollectionID | DestinationCategory
  sort: number
}

const destinationCategoriesSchema: z.ZodType<DestinationCategories> = z.object({
  id: z.number(),
  destination_iata_code: collectionIDSchema.or(z.lazy(() => destinationSchema )),
  destination_category_id: collectionIDSchema.or(z.lazy(() => destinationCategorySchema )),
  sort: z.number()
})

function isDestinationCategoriesArray(value: unknown): value is DestinationCategories[] {
  return destinationCategoriesSchema.array().safeParse(value).success
}

export {
  destinationCategoriesSchema,
  isDestinationCategoriesArray,
  type DestinationCategories
}