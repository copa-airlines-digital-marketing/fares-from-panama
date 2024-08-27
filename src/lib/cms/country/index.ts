import { z } from "zod"
import { collectionIDSchema, updateOnlyBaseCollectionSchema, type CollectionID, type UpdateOnlyBaseCollection } from ".."
import { iconsSchema } from "../icon"
import { destinationSchema, type Destination } from "../destination"
import { countryTransaltionSchema, type CountryTransaltion } from "../country-translations"

type Country = UpdateOnlyBaseCollection & {
  code: string,
  phone_code: string,
  currency_code: string
  translations: CollectionID[] | CountryTransaltion[]
  destinations: CollectionID[] | Destination[]
}

const countrySchema: z.ZodType<UpdateOnlyBaseCollection> = updateOnlyBaseCollectionSchema.extend({
  code: z.string(),
  phone_code: z.string(),
  currency_code: z.string(),
  flag: collectionIDSchema.or(iconsSchema),
  translations: collectionIDSchema.array().or(z.lazy(() => countryTransaltionSchema.array() )),
  destintations: collectionIDSchema.array().or(z.lazy(() => destinationSchema.array() ))
})

export {
  countrySchema,
  type Country
}
