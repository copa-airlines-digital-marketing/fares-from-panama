import { groupBy, map, omit, pipe } from "ramda";
import type { fareDestinationReturnSchema } from "../utils/fares";

const assocPriceAndMax = (fare: fareDestinationReturnSchema) => ({
  ...fare,
  price: fare.min?.price || -1,
  score: fare.max?.score || -1
})

const omitAggregations = omit(['min', 'max'])

export const transformResponseToFares = pipe(assocPriceAndMax, omitAggregations)

const getDaysProps = (fare: ReturnType<typeof transformResponseToFares>) => fare.days.toString()

const getDestinationProp = (fare: ReturnType<typeof transformResponseToFares>) => fare.destination

export const groupByDays = groupBy(getDaysProps)

export const groupByDestination = groupBy(getDestinationProp)

const getLowestFaresByDestinationAndDays = pipe(map(transformResponseToFares), groupByDays, map(groupByDestination), map(map(value => value[0])))

export {
  getLowestFaresByDestinationAndDays
}