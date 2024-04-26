import { z } from "zod"
import { iconReturnSchema } from "./icon"

export const textContentReturnSchema = z.object({
  name: z.string(),
  icon: iconReturnSchema.nullable().optional(),
  translations: z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    media: z.string().nullable().optional(),
    embed_media: z.string().nullable().optional(),
    call_to_actions: z.object({
      text: z.string(),
      link: z.string(),
      open_in: z.string()
    }).array().nullable().optional()
  }).array().optional()
})

export type TextContentReturnSchema = z.infer<typeof textContentReturnSchema>

export const isTextContent = (value: unknown): value is TextContentReturnSchema => textContentReturnSchema.safeParse(value).success

export const isTextContentArray = (value: unknown): value is TextContentReturnSchema[] => textContentReturnSchema.array().safeParse(value).success