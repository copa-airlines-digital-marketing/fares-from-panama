import { z } from "zod"
import { colorReturnSchema } from "./color"
import { sectionContentReturnSchema } from "./sectionContent"

export const sectionReturnSchema = z.object({
  name: z.string(),
  section_id: z.string().nullable().optional(),
  landmark: z.string().nullable().optional(),
  horizontal_behaviour: z.string().nullable(),
  content_spacing: z.string().nullable().optional(),
  content_horizontal_alignment: z.string().nullable().optional(),
  content_horizontal_distribution: z.string().nullable().optional(),
  content_vertical_alignment: z.string().nullable().optional(),
  content_vertical_distribution: z.string().nullable().optional(),
  background_color: colorReturnSchema.optional(),
  section_content: sectionContentReturnSchema.array().optional()
})

type SectionReturnSchema = z.infer<typeof sectionReturnSchema>

export const isSection = (value: unknown): value is SectionReturnSchema => sectionReturnSchema.safeParse(value).success

export const isSectionArray = (value: unknown): value is SectionReturnSchema[] => sectionReturnSchema.array().safeParse(value).success
