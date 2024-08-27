import { __, apply, ascend, assoc, groupBy, head, last, map, mergeDeepLeft, pipe, prop, sort, sortBy, tail, tap } from "ramda";
import type { faresReturnSchema } from "../utils/fares";
import { getMonthName, inititeFareMonth, parseDate, say } from "../utils";
import { getMonth } from "date-fns/getMonth";
import { format } from "date-fns";

type CalendarModules = {
  calendarMonths: App.LowestFareByMonthAndDestination
  calendarFares: App.FaresByDateOfDestination
}

const formatDateMonth = (date: Date) => format(date, 'yyyy-MM-01')

const getMonthOfDeparture = pipe(prop('departure'), parseDate, formatDateMonth)

const setMonth = (fare: faresReturnSchema) => ({...fare, month: getMonthOfDeparture(fare)})

const groupByDestination = groupBy(prop('destination'))

const groupByDays = map(groupBy(prop('days')))

const groupByMonthYear = map(map(groupBy(prop('month'))))

const groupByDate = map(map(map(groupBy(prop('departure')))))

const processFare = pipe(map(setMonth), groupByDestination, groupByDays, groupByMonthYear)

const sortFn = (a: faresReturnSchema, b: faresReturnSchema) => a.price - b.price

const getLowest = pipe(sort(sortFn), head)

const getLowestsByMonths = map(map(map(getLowest)))

const getLowestByDate = map(map(map(map(getLowest))))

const getCalendarFares = pipe(groupByDate, getLowestByDate)

const prepareCalendarOfDestination = (fares: faresReturnSchema[]): CalendarModules => {
  const upToMonthsGroup = processFare(fares)
  const calendarMonths = getLowestsByMonths(upToMonthsGroup)
  const months = map(map(map(inititeFareMonth)), calendarMonths)
  const calendarFares = mergeDeepLeft(getCalendarFares(upToMonthsGroup), months)
  return {
    calendarMonths,
    calendarFares
  }
} 

export { 
  prepareCalendarOfDestination,
  type CalendarModules
}