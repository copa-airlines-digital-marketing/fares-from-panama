import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

const id = 'selectedBudget'

export const setBudgetContext = (value: number) => {
  const store = writable(value)
  setContext(id, store)
  return store
}

export const getBudgetContext = () => {
  return getContext<Writable<number>>(id)
}