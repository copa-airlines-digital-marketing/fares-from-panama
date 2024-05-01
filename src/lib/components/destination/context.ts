import type { DestinationReturnSchema } from "$lib/public/utils/destinations"
import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

const allKey = 'destinations'
const selectedKey = 'selectedDestination'

export const setDestinationState = (all: App.Destination = <App.Destination>{},selected: DestinationReturnSchema | undefined = undefined) => {
  const allStore = writable(all)
  const selectedStore = writable(selected)
  setContext(allKey, allStore)
  setContext(selectedKey, selectedStore)
  return {all: allStore, selected: selectedStore}
}

export const getDestinationsContext = () =>  {
  return {
    all: getContext<Writable<App.Destination>>(allKey),
    selected: getContext<Writable<DestinationReturnSchema | undefined>>(selectedKey)
  }
}