import type { z } from "zod";
import { codeNameObjectSchema, updateOnlyBaseCollectionSchema } from "..";

const languageSchema = updateOnlyBaseCollectionSchema.merge(codeNameObjectSchema)

type Language = z.infer<typeof languageSchema>

export {
  languageSchema
}

export type { Language }

