import { z } from "zod"

export const faresReturnSchema = z.object({
  destination: z.string(),
  days: z.number(),
  departure: z.string(),
  return: z.string(),
  fare: z.number(),
  taxes: z.number(),
  price: z.number(),
  seats: z.number(),
  score: z.number(),
  updated_at: z.string()
})

export const fareDestinationReturnSchema = z.object({
  destination: z.string(),
  days: z.number(),
  min: z.object({
    price: z.number(),
    updated_at: z.string()
  }),
  max: z.object({
    score: z.number()
  }) 
})

export const fareDaysReturnSchema = z.object({
  days: z.number(),
  min: z.object({
    updated_at: z.string()
  })
})

export type faresReturnSchema = z.infer<typeof faresReturnSchema>

export type fareDestinationReturnSchema = z.infer<typeof fareDestinationReturnSchema>

type fareDaysReturnSchema = {
  days: number
  min: {
    updated_at: string
  }
}

export const defaultFare: faresReturnSchema = {
  destination: 'COPA',
  days: -1,
  departure: '1944-06-21',
  return: 'undefined',
  fare: 0,
  taxes: 0,
  price: 0,
  seats: 1,
  score: 1,
  updated_at: '2024-08-15 00:00:00'
}

export const isViajaPanamaFare = (value: unknown): value is faresReturnSchema => faresReturnSchema.safeParse(value).success

export const isViajaPanamaFareArray = (value: unknown): value is faresReturnSchema[] => faresReturnSchema.array().safeParse(value).success

export const isViajaPanamaFareDestinationArray = (value: unknown): value is fareDestinationReturnSchema[] => fareDestinationReturnSchema.array().safeParse(value).success

export const isViajaPanamaFareDaysArray = (value: unknown): value is fareDaysReturnSchema[] => fareDaysReturnSchema.array().safeParse(value).success