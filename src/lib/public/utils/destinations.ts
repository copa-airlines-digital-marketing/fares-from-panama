import { curry } from "ramda"
import { z } from "zod"
import { countryReturnSchema } from "./country"
import { interestReturnSchema } from "./interest"

export const destinationReturnSchema = z.object({
  iata_code: z.string(),
  main_image: z.string().nullable().optional(),
  translations: z.object({
    name: z.string(),
    airport_name: z.string(),
    airtrfx_uri: z.string()
  }).array(),
  country: countryReturnSchema,
  categories: z.object({
    destination_category_id: interestReturnSchema
  }).array()
})

export type DestinationReturnSchema = z.infer<typeof destinationReturnSchema>

export const defaultDestination: DestinationReturnSchema = {
  iata_code: 'COPA',
  main_image: 'cdcde722-614e-41a1-801f-c56a4aab06f9',
  translations: [{
    name: 'Copa Airlines',
    airport_name: 'Copa Airlines',
    airtrfx_uri: '/'
  }],
  country: {
    code: 'PA',
    currency_code: 'USD',
    phone_code: 507,
    flag:{
      name: 'Panama',
      code: '',
      category: '',
      image: ''
    },
    translations: [{
      name: 'Panama',
      airtrfx_uri: '/'
    }],
  },
  categories: [{
    destination_category_id: {
      name: 'Categoria',
      translations: [{
        name: 'Categoria',
        airtrfx_uri: '/'
      }]
    }
  }]
}

export const isDestination = (value: unknown): value is DestinationReturnSchema => destinationReturnSchema.safeParse(value).success

export const isDestinationArray = (value: unknown): value is DestinationReturnSchema[] => destinationReturnSchema.array().safeParse(value).success

const toAppDestinationObject = (destination: DestinationReturnSchema): App.Destination => ({[destination.iata_code]: destination}) 

export const transformDestinations = (destinations: DestinationReturnSchema[]): App.Destination => destinations.reduce((accumulator, current) => ({...accumulator, ...toAppDestinationObject(current)}), {})

export const addDestination = curry((destinations: App.Destination, fare: ViajaPanamaFare): DestinationReturnSchema => {

  const {destination} = fare

  const newDestinations = {...destinations}

  if (newDestinations[destination])
    return newDestinations[destination]

  const currentUnknown = {...defaultDestination}

  currentUnknown.iata_code = destination

  return currentUnknown
})