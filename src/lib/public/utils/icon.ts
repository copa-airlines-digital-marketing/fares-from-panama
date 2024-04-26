import { z } from "zod"

export const iconReturnSchema = z.object({
  name: z.string(),
  category: z.string().nullable().optional(),
  image: z.string(),
  code: z.string()
})

type IconReturnSchema = z.infer<typeof iconReturnSchema>


export const isIcon = (value: unknown): value is IconReturnSchema => iconReturnSchema.safeParse(value).success

export const isIconArray = (value: unknown): value is IconReturnSchema[] => iconReturnSchema.array().safeParse(value).success