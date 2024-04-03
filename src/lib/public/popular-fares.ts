import { fareDepartureIsBeforeExisting } from "./utils"

const isValidToAdd = (fare: Directus.Fare, existing: Directus.Fare) => 
(fare.score > existing.score) || (fare.score === existing.score && fareDepartureIsBeforeExisting(fare,existing))

export const addPopularFare = (module: App.PopularFares, fare: Directus.Fare): App.PopularFares => {
  const {days, destination} = fare

  const newModule = {...module} 

  if (!newModule[days])
    newModule[days] = {}
  
  if (!newModule[days][destination]){
    newModule[days][destination] = fare
    return ({...newModule})
  }

  const existing = newModule[fare.days][fare.destination]

  if (isValidToAdd(fare,existing)){
    newModule[days][destination] = fare
    return ({...newModule})
  }

  return {...newModule}
} 