import { z } from "zod"
import { countryTransaltionSchema, type CountryTransaltion } from "../country-translations"

type Country = {
  code: string,
  translations: CountryTransaltion[]
}

const countrySchema: z.ZodType<Country> = z.object({
  code: z.string(),
  translations: countryTransaltionSchema.array(),
})

export {
  countrySchema,
  type Country
}
