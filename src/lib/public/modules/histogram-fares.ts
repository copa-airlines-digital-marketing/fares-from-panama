import { format } from "date-fns"
import { inititeHistogramFareMonth, inititeHistogramFareMonthDates, isEmptyObject, isValidToAdd, parseDeparture } from "../utils"
import { YEAR_MONTH_FORMAT } from "./constants"

const addDestinationToHistogram = (module: App.FaresByDate, fare: Directus.Fare) => {

  const {days, departure, destination} = fare

  const fareMonth = format(parseDeparture(fare), YEAR_MONTH_FORMAT)

  const newModule = {...module} 

  if (!newModule[days])
    newModule[days] = {}

  if (!newModule[days][fareMonth])
    newModule[days][fareMonth] = inititeHistogramFareMonthDates(fare)

  if (isEmptyObject(newModule[days][fareMonth][departure]))
    newModule[days][fareMonth][departure]= {}

  if (!newModule[days][fareMonth][departure][destination]){
      newModule[days][fareMonth][departure][destination]= fare
      return {...newModule}
  }
  
  const existing = newModule[days][fareMonth][departure][destination]

  if (isValidToAdd(fare, existing)){
    newModule[days][fareMonth][departure][destination]= fare
    return ({...newModule})
  }

}


const setLowestFareByDate = (module: App.LowestFareByDate, fare: Directus.Fare) => {

  const {days, departure} = fare

  const fareMonth = format(parseDeparture(fare), YEAR_MONTH_FORMAT)

  const newModule = {...module} 

  if (!newModule[days])
    newModule[days] = {}

  if (!newModule[days][fareMonth])
    newModule[days][fareMonth] = inititeHistogramFareMonth(fare)

  if (isEmptyObject(newModule[days][fareMonth][departure])){
    newModule[days][fareMonth][departure]= fare
    return {...newModule}
  }
  
  const existing = newModule[days][fareMonth][departure]

  if (isValidToAdd(fare, existing)){
    newModule[days][fareMonth][departure] = fare
    return ({...newModule})
  }

  return {...newModule}

}

const setLowestFareMonth = (module: App.LowestFareByMonth, fare: Directus.Fare) => {
  const {days} = fare

  const fareMonth = format(parseDeparture(fare), YEAR_MONTH_FORMAT)

  const newModule = {...module} 

  if (!newModule[days])
    newModule[days] = {}

  if (!newModule[days][fareMonth]){
    newModule[days][fareMonth] = fare
    return ({...newModule})
  }

  const existing = newModule[days][fareMonth]

  if (isValidToAdd(fare, existing)){
    newModule[days][fareMonth] = fare
    return ({...newModule})
  }

  return {...newModule}
}

export const addFareToHistogram = (months: App.LowestFareByMonth, dates: App.LowestFareByDate, fares: App.FaresByDate, fare: Directus.Fare) => 
  ({
    histogramMonths: setLowestFareMonth(months, fare),
    histogramDays: setLowestFareByDate(dates, fare),
    histogram: addDestinationToHistogram(fares, fare),
  })