import { z } from "zod"
import { collectionIDSchema, type CollectionID, type UpdateOnlyBaseCollection } from ".."
import { destinationTranslationSchema, type DestinationTranslation } from "../destination-translations"
import { countrySchema, type Country } from "../country"
import type { DestinationCategories } from "../destination-categories"

type Destination = UpdateOnlyBaseCollection & {
  status: string
  iata_code: string
  codeshare: boolean
  translations: CollectionID[] | DestinationTranslation[]
  categories: CollectionID[] | DestinationCategories[]
  country: CollectionID | Country
  maketing_category: string
  flight_duration_from_panama: number
  time_zone_offset: string
  hub_floor: string
  location: string
  main_image: string
}

const destinationSchema: z.ZodType<Destination> = z.object({
  status: z.optional(z.string()),
  iata_code: z.optional(z.string()),
  codeshare: z.boolean(),
  translations: collectionIDSchema.array().or(z.lazy(() => destinationTranslationSchema.array() )),
  //categories: CollectionID[] | DestinationInterest[],
  //region: CollectionID | GeoRegion,
  //copa_region: CollectionID | CopaRegion,
  country: collectionIDSchema.or(z.lazy(() => countrySchema )), 
  maketing_category: z.string(),
  flight_duration_from_panama: z.number(),
  time_zone_offset: z.string(),
  hub_floor: z.optional(z.string()),
  location: z.string(),
  main_image: z.optional(z.string()),
  gallery: z.optional(collectionIDSchema)
})


function isDestination(value: unknown): value is Destination {
  return destinationSchema.safeParse(value).success
}

export {
  destinationSchema,
  isDestination,
  type Destination
}