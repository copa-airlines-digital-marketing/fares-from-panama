import { z } from "zod"

type DestinationCategoryTranslation = {
  name: string
}

const destinationCategoryTranslationSchema: z.ZodType<DestinationCategoryTranslation> = z.object({
  name: z.string(),
})

export {
  destinationCategoryTranslationSchema,
  type DestinationCategoryTranslation
}