import { z } from "zod"

export const pageReturnSchema = z.object({
  id: z.number(),
  name: z.string(),
  share_image: z.string().optional().nullable(),
  translations: z.object({
    title_tag: z.string(),
    meta_description: z.string()
  }).array(),
  storefronts: z.object({
    sections: z.object({
      
    }).array()
  }).array()
})

type PageReturnSchema = z.infer<typeof pageReturnSchema>

export const isPage = (value: unknown): value is PageReturnSchema => pageReturnSchema.safeParse(value).success

export const isPageArray = (value: unknown): value is PageReturnSchema[] => pageReturnSchema.array().safeParse(value).success
