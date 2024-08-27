import { concat, groupBy, head, map, mapObjIndexed, omit, pipe, prop, reduce, sortBy, tail, tap, unwind, values } from "ramda";
import type { DestinationReturnSchema } from "../utils/destinations";
import type { InterestReturnSchema } from "../utils/interest";
import { say } from "../utils";

const getTranslationName = (intesrest: InterestReturnSchema) => {
  return intesrest.translations?.at(0)?.name || intesrest.name
}

const concatReduceBy = reduce(concat, [])

const unwindDestinations = unwind('categories')

const concatCategories = (category: Pick<DestinationReturnSchema, 'categories'>) => concatReduceBy(category.categories.map(value => values(value).map(getTranslationName)))

const mapToCategoriesArray = (destination: DestinationReturnSchema) =>  ({
  iata_code: destination.iata_code,
  categories: concatCategories(destination)
})

const groupByCategory = groupBy(prop('categories'))

const addParams = (cats: object) => (value: object, key: string) => ({...value, ...cats[key]})

const createArrayOfDestinationsAndCategories = pipe(map(mapToCategoriesArray), tap(say('no more')), addParams, mapObjIndexed)

const omitDaysAndIata = map(omit(['days', 'iata_code']))

export const getLowestByInterest = (destinations: App.Destination, fares: App.FaresByDays) => {
  const lowestByDayCategoryAndDestination = map(pipe(createArrayOfDestinationsAndCategories(destinations), omitDaysAndIata, tap(say('hello')), map(unwindDestinations), values, concatReduceBy, groupByCategory), fares)
  const lowestByDayAndCategory = map(map(pipe(values, sortBy(prop('price')), head, omit(['categories']))), lowestByDayCategoryAndDestination)
  return {
    lowestByDayCategoryAndDestination,
    lowestByDayAndCategory
  }
}
