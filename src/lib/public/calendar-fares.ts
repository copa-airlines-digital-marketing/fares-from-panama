import { format } from "date-fns"
import { inititeFareMonth, isEmptyObject, isValidToAdd, parseDeparture } from "./utils"
import { YEAR_MONTH_FORMAT } from "./constants"


const addFareToCalendarDate = (module: App.FaresByDateOfDestination, fare: Directus.Fare) => {

  const {days, destination, departure} = fare

  const fareMonth = format(parseDeparture(fare), YEAR_MONTH_FORMAT)

  const newModule = {...module} 

  if (!newModule[destination])
    newModule[destination] = {}

  if (!newModule[destination][days])
    newModule[destination][days]= {}

  if (!newModule[destination][days][fareMonth])
    newModule[destination][days][fareMonth]= inititeFareMonth(fare)

  if (isEmptyObject(newModule[destination][days][fareMonth][departure])){
    newModule[destination][days][fareMonth][departure] = fare
    return {...newModule}
  }
  
  const existing = newModule[destination][days][fareMonth][departure]

  if (isValidToAdd(fare, existing)){
    newModule[destination][days][fareMonth][departure] = fare
    return ({...newModule})
  }

  return {...newModule}
}

const setLowestFareMonth = (module: App.LowestFareByMonthAndDestination, fare: Directus.Fare) => {
  const {days, destination} = fare

  const fareMonth = format(parseDeparture(fare), YEAR_MONTH_FORMAT)

  const newModule = {...module} 

  if (!newModule[destination])
    newModule[destination] = {}

  if (!newModule[destination][days])
    newModule[destination][days]= {}

  if (!newModule[destination][days][fareMonth]){
    newModule[destination][days][fareMonth] = fare
    return ({...newModule})
  }

  const existing = newModule[destination][days][fareMonth]

  if (isValidToAdd(fare, existing)){
    newModule[destination][days][fareMonth] = fare
    return ({...newModule})
  }

  return {...newModule}
}

export const addFareToCalendar = (months: App.LowestFareByMonthAndDestination, calendar: App.FaresByDateOfDestination, fare: Directus.Fare) => 
  ({
    calendar: addFareToCalendarDate(calendar, fare), 
    calendarMonths: setLowestFareMonth(months, fare)
  })