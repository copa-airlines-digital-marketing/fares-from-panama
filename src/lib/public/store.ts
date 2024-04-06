import { writable } from "svelte/store";

export const destinationsStore = writable<App.Destination>({})

export const selectedDestination = writable<Directus.Destination | undefined>(undefined)

export const selectedDaysStore = writable<Record<string, number>>({})

export const selectedBudgetStore = writable<number>()

export const selectedInterestStore = writable<string>()

export const selectedCalendarMonthStore = writable<string>()

export const selectedHistogramMonthStore = writable<string>()

export const selectedHistogramDateStore = writable<string>()

export const ping = writable<boolean>(false)

export const containsDiscounts = writable<boolean>(false)

export const modulesStore = writable<App.Modules>()
