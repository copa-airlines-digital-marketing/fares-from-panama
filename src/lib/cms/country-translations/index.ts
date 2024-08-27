import { z } from "zod"

const countryTransaltionSchema = z.object({
  name: z.string(),
  airtrfx_uri: z.nullable(z.string())
})

type CountryTransaltion = z.infer<typeof countryTransaltionSchema>

export {
  countryTransaltionSchema,
  type CountryTransaltion
}