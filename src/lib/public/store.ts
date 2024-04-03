import { writable } from "svelte/store";

export const destinationsStore = writable<App.Destination>({})

export const selectedDestination = writable<Directus.Destination | undefined>(undefined)

export const selectedDaysStore = writable<number>()

export const selectedBudgetStore = writable<number>()

export const ping = writable<boolean>(false)

export const containsDiscounts = writable<boolean>(false)

export const modulesStore = writable<App.Modules>()
