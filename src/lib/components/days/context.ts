import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

type DayStore = {
  days: number[]
  selectedDays: Record<string, string | undefined>
}

const selectedId = 'selectedDays'
const daysId = 'daysOfFares'

export const setDaysContext =  ({days, selectedDays}: DayStore) => {
  const selectedStore = writable(selectedDays)
  const daysStore = writable(days)
  setContext(daysId, daysStore)
  setContext(selectedId, selectedStore)
  return {days: daysStore, selected: selectedStore}
}

export const getDaysContext = () => {
  return {
    days: getContext<Writable<DayStore['days']>>(daysId), 
    selected: getContext<Writable<DayStore['selectedDays']>>(selectedId)
  }
}