import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

const lowestId = 'lowests'
const lowestByDayAndCategoryId = 'lowestByDayAndCategory'
const lowestByDayCategoryAndDestination = 'lowestByDayCategoryAndDestination'

export const setLowestFaresContext = (modules: App.FaresByDays = <App.FaresByDays>{}) => {
  const store = writable(modules)
  setContext(lowestId, store)
  return store
}

export const getLowestFaresContext = () => {
  return getContext<Writable<App.FaresByDays>>(lowestId)
}

export const setInterestLowestContext = (modules: App.LowestFareByInterest = <App.LowestFareByInterest>{}) => {
  const store = writable(modules)
  setContext(lowestByDayAndCategoryId, store)
  return store
}

export const getInterestLowestContext = () => {
  return getContext<Writable<App.LowestFareByInterest>>(lowestByDayAndCategoryId)
}


export const setInterestsFaresContext = (modules: App.InterestFares = <App.InterestFares>{}) => {
  const store = writable(modules)
  setContext(lowestByDayCategoryAndDestination, store)
  return store
}

export const getInterestsFaresContext = () => {
  return getContext<Writable<App.InterestFares>>(lowestByDayCategoryAndDestination)
}