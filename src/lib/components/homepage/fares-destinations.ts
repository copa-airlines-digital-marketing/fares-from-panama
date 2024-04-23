import { destinationsStore } from "$lib/public/store";

export const setFaresDestinations = async() => {
  try {
    const destinationsRequest = await fetch('/api/destinations', { method: 'GET' });
		const destinations = await destinationsRequest.json();
		destinationsStore.set(destinations);
  }catch(e) {
    destinationsStore.set()
  } 
}