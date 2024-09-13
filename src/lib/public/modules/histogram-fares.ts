import { z } from "zod"
import { groupBy, map, mergeDeepLeft, omit, path, pipe, prop } from "ramda"
import { formatForMonthYear, inititeHistogramFareMonthDates, parseDeparture } from "../utils"
import { startOfMonth } from "date-fns/fp"
import { groupByDays, groupByDestination } from "./lowests"
import { getLowest } from "./calendar-fares"
import type { faresReturnSchema } from "../utils/fares"

const minPriceByMonthSchema = z.object({
  departure: z.string(),
  days: z.number(),
  min: z.object({
    price: z.number(),
    'updated_at': z.string()
  })
})

type MinPriceByMonth = z.infer<typeof minPriceByMonthSchema>

const isMinPriceByMonthArray = (value: unknown): value is MinPriceByMonth[] =>  {
  return minPriceByMonthSchema.array().safeParse(value).success
}

const getDepartureMonthFirstDate = pipe(parseDeparture, startOfMonth, formatForMonthYear)

const assocMinPriceAndCalculateMonth = (data: MinPriceByMonth) => ({...data, price: path(['min', 'price'], data), month: getDepartureMonthFirstDate(data)}) 

const groupByMonth = map(groupBy(prop('month')))

const groupByDate = map(map(groupBy(prop('departure'))))

const prepareByDays = pipe(map(assocMinPriceAndCalculateMonth), map(omit(['min'])), groupByDays)

const calculateLowestByMonth = pipe(prepareByDays, groupByMonth, map(map(getLowest)))

const calculateLowestByDate = pipe(prepareByDays, groupByMonth, groupByDate, map(map(map(getLowest))))

const preparerHistogramMonths = (fares: MinPriceByMonth[]) => {
  const histogramMonths = calculateLowestByMonth(fares)
  const months = map(map(inititeHistogramFareMonthDates), histogramMonths)
  const histogramDays = mergeDeepLeft(calculateLowestByDate(fares), months)
  return{
    histogramMonths,
    histogramDays,
  }
}

const addMonth = (fare: faresReturnSchema) => ({...fare, month: getDepartureMonthFirstDate(fare)})

const calculateFaresByDate = pipe(map(addMonth), groupByDays, groupByMonth, groupByDate, map(map(map(groupByDestination))), map(map(map(map(getLowest)))))

const prepareHistogramFares = (fares: faresReturnSchema[]) => calculateFaresByDate(fares)

export {
  minPriceByMonthSchema,
  preparerHistogramMonths,
  prepareHistogramFares,
  isMinPriceByMonthArray
}

export type {
  MinPriceByMonth
}