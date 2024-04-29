import { z } from "zod"

export const colorReturnSchema = z.object({
  name: z.string(),
  hex: z.string().optional()
})

type ColorReturnSchema = z.infer<typeof colorReturnSchema>

export const isColor = (value: unknown): value is ColorReturnSchema => colorReturnSchema.safeParse(value).success

export const isColorArray = (value: unknown): value is ColorReturnSchema[] => colorReturnSchema.array().safeParse(value).success
