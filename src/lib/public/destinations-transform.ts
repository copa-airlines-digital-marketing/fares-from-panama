
const toAppDestinationObject = (destination: Directus.Destination): App.Destination => ({[destination.iata_code]: destination}) 

export const transformDestinations = (destinations: Directus.Destination[]): App.Destination => destinations.reduce((accumulator, current) => ({...accumulator, ...toAppDestinationObject(current)}), {})

export const addDestination = (destinations: App.Destination, full: App.Destination, fare: Directus.Fare) => {

  const {destination} = fare

  const newDestinations = {...destinations}

  if (newDestinations[destination])
    return newDestinations
  
  newDestinations[destination] = full [destination]

  return newDestinations
}