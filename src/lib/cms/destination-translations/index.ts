import { z } from "zod";
import { collectionIDSchema, type CollectionID } from "..";
import { destinationSchema, type Destination } from "../destination";
import { languageSchema, type Language } from "../language";


type DestinationTranslation = {
  id: number,
  name: string,
  airportname: string,
  airtrfx_uri: string,
  destinations_iata_code: CollectionID | Destination,
  languages_code: CollectionID | Language,
}

const destinationTranslationSchema: z.ZodType<DestinationTranslation> = z.object({
  id: z.number(),
  name: z.string(),
  airport_name: z.string(),
  airtrfx_uri: z.string(),
  destinations_iata_code: collectionIDSchema.or(z.lazy(() => destinationSchema)),
  languages_code: collectionIDSchema.or(languageSchema),
})

export {
  destinationTranslationSchema
}

export type {
  DestinationTranslation
}