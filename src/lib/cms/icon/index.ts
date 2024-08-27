import { z } from "zod"
import { baseCollectionSchema } from ".."

const iconsSchema = baseCollectionSchema.extend({
  name: z.string(),
  category: z.optional(z.string()),
  image: z.string(),
  code: z.string(),
})

type Icon = z.infer<typeof iconsSchema>

export {
  iconsSchema,
  type Icon
}