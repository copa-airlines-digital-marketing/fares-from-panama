import { z } from "zod"
import { iconReturnSchema } from "./icon"


export const countryReturnSchema = z.object({
  code: z.string(),
  currency_code: z.string(),
  phone_code: z.number(),
  translations: z.object({
    name: z.string(),
    airtrfx_uri: z.string().nullable().optional()
  }).array(),
  flag: iconReturnSchema.nullable().optional()
})

type CountryReturnSchema = z.infer<typeof countryReturnSchema>

export const isCountry = (value: unknown): value is CountryReturnSchema => countryReturnSchema.safeParse(value).success

export const isCountryArray = (value: unknown): value is CountryReturnSchema[] => countryReturnSchema.array().safeParse(value).success