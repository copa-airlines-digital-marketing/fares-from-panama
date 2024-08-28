import { z } from "zod"
import { groupBy, map, omit, path, pipe, prop } from "ramda"
import { formatForMonthYear, parseDeparture } from "../utils"
import { startOfMonth } from "date-fns/fp"
import { groupByDays } from "./lowests"
import { getLowest } from "./calendar-fares"

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

const preparerHistogramMonths = (fares: MinPriceByMonth[]) => ({
  histogramMonths: calculateLowestByMonth(fares),
  histogramDays: calculateLowestByDate(fares)
})

export {
  minPriceByMonthSchema,
  preparerHistogramMonths,
  isMinPriceByMonthArray
}

export type {
  MinPriceByMonth
}