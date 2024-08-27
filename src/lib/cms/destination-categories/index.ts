import { z } from "zod"
import { destinationCategorySchema, type DestinationCategory } from "../category"

type DestinationCategories = {
  destination_category_id: DestinationCategory
}

const destinationCategoriesSchema: z.ZodType<DestinationCategories> = z.object({
  destination_category_id: destinationCategorySchema,
})

function isDestinationCategoriesArray(value: unknown): value is DestinationCategories[] {
  return destinationCategoriesSchema.array().safeParse(value).success
}

export {
  destinationCategoriesSchema,
  isDestinationCategoriesArray,
  type DestinationCategories
}