import { getContext, setContext } from "svelte"
import { writable } from "svelte/store"


export const setModulesContext = (initialModules: App.Modules) => {
  const modules = writable(initialModules)
  setContext('modules', modules)
  return modules
}

export const getModulesContext = () => {
  return getContext<App.Modules>('modules')
}