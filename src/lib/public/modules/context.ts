import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

const id = 'lowests'

export const setLowestFaresContext = (modules: App.FaresByDays = <App.FaresByDays>{}) => {
  const store = writable(modules)
  setContext(id, store)
  return store
}

export const getLowestFaresContext = () => {
  return getContext<Writable<App.FaresByDays>>(id)
}