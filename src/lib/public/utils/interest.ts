import { z } from "zod"

export const interestReturnSchema = z.object({
  name: z.string(),
  translations: z.object({
    name: z.string(),
    airtrfx_uri: z.string().optional()
  }).array().optional()
})

type InterestReturnSchema = z.infer<typeof interestReturnSchema>

export const isCountry = (value: unknown): value is InterestReturnSchema => interestReturnSchema.safeParse(value).success

export const isCountryArray = (value: unknown): value is InterestReturnSchema[] => interestReturnSchema.array().safeParse(value).success