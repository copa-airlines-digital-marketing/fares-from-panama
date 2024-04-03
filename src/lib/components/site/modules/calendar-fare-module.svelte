<script lang="ts">
	import {
		selectedDaysStore,
		selectedDestination,
		selectedCalendarMonthStore
	} from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/calendar-fare.svelte';

	export let module: Directus.FareModule;
	export let calendar: App.FaresByDateOfDestination;

	$: console.log($selectedDaysStore, $selectedDestination, $selectedCalendarMonthStore);

	$: fareCards =
		$selectedDaysStore && $selectedDestination && $selectedCalendarMonthStore
			? Object.values(
					calendar[$selectedDestination.iata_code][$selectedDaysStore][$selectedCalendarMonthStore]
				)
			: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

<ul>
	{#each fareCards as fare}
		<li>
			<FareCard {fare} {labels}></FareCard>
		</li>
	{:else}
		<li>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['instructions']}
			</Heading>
		</li>
	{/each}
</ul>
