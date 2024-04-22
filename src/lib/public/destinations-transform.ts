import { curry } from "ramda"

const toAppDestinationObject = (destination: Destination): App.Destination => ({[destination.iata_code]: destination}) 

const UnknownDestination: Destination = {
  iata_code: 'XXX',
  codeshare: false,
  translations: [],
  categories: [],
  region: -1,
  copa_region: -1,
  country: -1,
  maketing_category: 'unknown',
  flight_duration_from_panama: -1,
  time_zone_offset: 'unknown',
  hub_floor: 'unknown',
  location: 'unknown',
  main_image: 'unknown',
  date_created: 'unknown',
  date_updated: 'unknown',
  user_created: 'unknown',
  user_updated: 'unknown'
}

export const transformDestinations = (destinations: Destination[]): App.Destination => destinations.reduce((accumulator, current) => ({...accumulator, ...toAppDestinationObject(current)}), {})

export const addDestination = curry((destinations: App.Destination, fare: ViajaPanamaFares): Destination => {

  const {destination} = fare

  const newDestinations = {...destinations}

  if (newDestinations[destination])
    return newDestinations[destination]

  const currentUnknown = {...UnknownDestination}

  currentUnknown.iata_code = destination

  return currentUnknown
})