import { z } from "zod"

export const faresReturnSchema = z.object({
  destination: z.string(),
  days: z.number(),
  departure: z.string(),
  return: z.string(),
  fare: z.string(),
  taxes: z.string(),
  price: z.string(),
  seats: z.number(),
  score: z.number()
})

export const fareDestinationReturnSchema = faresReturnSchema.pick({destination: true})

type faresReturnSchema = z.infer<typeof faresReturnSchema>

type fareDestinationReturnSchema = z.infer<typeof fareDestinationReturnSchema>

export const defaultFare: faresReturnSchema = {
  destination: 'COPA',
  days: -1,
  departure: '1944-06-21',
  return: 'undefined',
  fare: '0',
  taxes: '0',
  price: '0',
  seats: 1,
  score: 1
}

export const isViajaPanamaFare = (value: unknown): value is faresReturnSchema => faresReturnSchema.safeParse(value).success

export const isViajaPanamaFareArray = (value: unknown): value is faresReturnSchema[] => faresReturnSchema.array().safeParse(value).success

export const isViajaPanamaFareDestinationArray = (value: unknown): value is fareDestinationReturnSchema[] => fareDestinationReturnSchema.array().safeParse(value).success
