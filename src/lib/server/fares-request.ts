
import type { Query } from "@directus/sdk";

export const getFaresQuery = (): Query<Directus.Schema, Directus.Fare>  => ({
  fields: [
    'id',
    'destination',
    'days',
    'departure',
    'return',
    'fare',
    'taxes',
    'price',
    'seats',
    'score'
  ],
  limit: -1
})