import { writable } from "svelte/store";

export const destinationsStore = writable<App.Destination>({})

export const selectedDestination = writable<Directus.Destination | undefined>(undefined)

export const selectedDays = writable<string>()

export const ping = writable<boolean>(false)

export const containsDiscounts = writable<boolean>(false)

