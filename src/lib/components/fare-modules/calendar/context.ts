import { getContext, setContext } from "svelte"
import { writable } from "svelte/store"

const monthKey = 'calendarMonth'

export const setCalendarContext = () => {
  const store = writable<string | undefined>(undefined)
  setContext(monthKey, store)
  return store
}

export const getCalendarContext = () => {
  return getContext(monthKey)
}