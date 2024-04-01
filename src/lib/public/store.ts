import { writable } from "svelte/store";

export const destinations = writable<Directus.Destination[]>([])

export const selectedDestination = writable<Directus.Destination | undefined>(undefined)

export const selectedDays = writable<string>()

export const ping = writable<boolean>(false)
