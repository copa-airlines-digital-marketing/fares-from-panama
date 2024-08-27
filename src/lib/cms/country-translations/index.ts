import { z } from "zod"
import { collectionIDSchema } from ".."
import { countrySchema } from "../country"
import { languageSchema } from "../language"

const countryTransaltionSchema = z.object({
  id: z.number(),
  countries_code: collectionIDSchema,
  languages_code: collectionIDSchema.or(languageSchema),
  name: z.string(),
  airtrfx_uri: z.string()
})

type CountryTransaltion = z.infer<typeof countryTransaltionSchema>

export {
  countryTransaltionSchema,
  type CountryTransaltion
}