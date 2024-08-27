import { z } from "zod";

type DestinationTranslation = {
  name: string,
  airport_name: string,
  airtrfx_uri: string,
}

const destinationTranslationSchema: z.ZodType<DestinationTranslation> = z.object({
  name: z.string(),
  airport_name: z.string(),
  airtrfx_uri: z.string()
})

export {
  destinationTranslationSchema
}

export type {
  DestinationTranslation
}