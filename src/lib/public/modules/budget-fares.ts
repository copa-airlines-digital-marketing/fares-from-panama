import { isValidToAdd } from "../utils"

export const addBudgetFare = (module: App.BudgetFares, fare: Directus.Fare): App.PopularFares => {

  const {days, destination} = fare

  const newModule = {...module} 

  if (!newModule[days])
    newModule[days] = {}
  
  if (!newModule[days][destination]){
    newModule[days][destination] = fare
    return ({...newModule})
  }

  const existing = newModule[fare.days][fare.destination]

  if (isValidToAdd(fare, existing)){
    newModule[days][destination] = fare
    return ({...newModule})
  }

  return {...newModule}
} 