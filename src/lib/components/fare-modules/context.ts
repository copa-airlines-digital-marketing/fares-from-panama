import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

const id = 'fare-modules'

export const setFareModulesContext = (modules: App.Modules = <App.Modules>{}) => {
  const store = writable(modules)
  setContext(id, store)
  return store
}

export const getFareModulesContext = () => {
  return getContext<Writable<App.Modules>>(id)
}