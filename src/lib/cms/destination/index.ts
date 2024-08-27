import { z } from "zod"
import { type UpdateOnlyBaseCollection } from ".."
import { destinationTranslationSchema, type DestinationTranslation } from "../destination-translations"
import { countrySchema, type Country } from "../country"
import { destinationCategoriesSchema, type DestinationCategories } from "../destination-categories"

type Destination = UpdateOnlyBaseCollection & {
  iata_code: string
  translations: DestinationTranslation[]
  categories: DestinationCategories[]
  country: Country
  main_image: string
}

const destinationSchema: z.ZodType<Destination> = z.object({
  iata_code: z.optional(z.string()),
  translations: destinationTranslationSchema.array(),
  categories: destinationCategoriesSchema.array(),
  country: countrySchema, 
  main_image: z.optional(z.string())
})


function isDestination(value: unknown): value is Destination {
  return destinationSchema.safeParse(value).success
}

export {
  destinationSchema,
  isDestination,
  type Destination
}