import { addBudgetFare } from "./budget-fares"
import { addFareToCalendar } from "./calendar-fares"
import { addDestination } from "./destinations-transform"
import { addFareToHistogram } from "./histogram-fares"
import { addFareToInterest } from "./interest-fares"
import { addPopularFare } from "./popular-fares"

const modules: App.Modules = {
  budget: {},
  calendarMonths: {},
  calendar: {},
  histogramMonths: {},
  histogramDays: {},
  histogram: {},
  interestNames: {},
  interests: {},
  popular: {},
  destinations: {}
}

const processFare = (destinations: App.Destination) => (accumulator: App.Modules, fare: Directus.Fare): App.Modules => ({
  budget: {...addBudgetFare(accumulator.budget, fare)},
  ...addFareToCalendar(accumulator.calendarMonths, accumulator.calendar, fare),
  ...addFareToHistogram(accumulator.histogramMonths, accumulator.histogramDays, accumulator.histogram, fare),
  //...addFareToInterest(accumulator.interestNames, accumulator.interests, destinations, fare),
  popular: {...addPopularFare(accumulator.popular, fare)},
  destinations: {...addDestination(accumulator.destinations, destinations, fare )}
})

export const processFares = (destinations: App.Destination, fares: Directus.Fare[]) => 
  fares.reduce(processFare(destinations), modules)