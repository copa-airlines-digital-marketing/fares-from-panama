<script lang="ts">
	import { transformDestinations } from '$lib/public/destinations-transform';
	import { processFares } from '$lib/public/process-fares';
	import { destinationsStore } from '$lib/public/store';
	import { valueIsDestinations, valueIsFaresArray } from '$lib/public/utils';

	export let destinations: unknown;
	export let fares: unknown;

	if (valueIsDestinations(destinations) && valueIsFaresArray(fares)) {
		const modules = processFares(transformDestinations(destinations), fares);
		destinationsStore.set(modules.destinations);
		console.log(modules);
	}
</script>

<slot />
