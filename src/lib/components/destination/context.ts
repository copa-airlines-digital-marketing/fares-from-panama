import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"


export const setDestinationState = (destinations: App.Destination) => {
  const destinationsStore = writable(destinations)
  setContext('destinations', destinationsStore)
  return destinationsStore
}

export const getDestinationsState = () =>  {
  return getContext<Writable<App.Destination>>('destinations')
}