import { isValidToAdd } from "./utils"


const addInterestFare = (module: App.InterestFares, name: App.Interest, fare: Directus.Fare) => {

  const {days, destination} = fare

  const newModule = {...module} 

  if (!newModule[days])
    newModule[days] = {}

  if (!newModule[days][name])
    newModule[days][name] = {}
  
  if (!newModule[days][name][destination]){
    newModule[days][name][destination] = fare
    return ({...newModule})
  }

  const existing = newModule[days][name][destination]

  if (isValidToAdd(fare, existing)){
    newModule[days][name][destination] = fare
    return ({...newModule})
  }

  return {...newModule}
}

const setLowestFareForInterest = (module: App.LowestFareByInterest, name: App.Interest, fare: Directus.Fare) => {

  const {days} = fare

  const newModule = {...module} 

  if (!newModule[days])
    newModule[days] = {}

  if (!newModule[days][name]){
    newModule[days][name] = fare
    return ({...newModule})
  }

  const existing = newModule[days][name]

  if (isValidToAdd(fare, existing)){
    newModule[days][name] = fare
    return ({...newModule})
  }

  return {...newModule}
}

export const addFareToInterest = (interestNames: App.LowestFareByInterest, interestModule: App.InterestFares, destinations: App.Destination, fare: Directus.Fare) => {
const interests = destinations[fare.destination].categories

let byName = {...interestNames}

let byInterest = {...interestModule}

interests.forEach(interest => {
  const interestName  = interest.destination_category_id.translations[0].name
  byName = setLowestFareForInterest(byName, interestName, fare)
  byInterest = addInterestFare(byInterest, interestName, fare)
});

return {interestNames: byName, interests: byInterest}
}