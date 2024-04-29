import { z } from "zod"

export const sectionContentReturnSchema = z.object({
  collection: z.string().nullable().optional(),
  component_name: z.string().nullable().optional(),
  display: z.string().nullable().optional(),
  horizontal_alignment: z.string().nullable().optional(),
  item: z.string(),
  theme: z.string().nullable().optional(), 
  vertical_alignment: z.string().nullable().optional()
})

type SectionReturnSchema = z.infer<typeof sectionContentReturnSchema>

export const isSectionContent = (value: unknown): value is SectionReturnSchema => sectionContentReturnSchema.safeParse(value).success

export const isSectionContentArray = (value: unknown): value is SectionReturnSchema[] => sectionContentReturnSchema.array().safeParse(value).success
