<script lang="ts">
	import { selectedDaysStore, selectedDestination } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/month-fare.svelte';
	import { parseDate } from '$lib/public/utils';

	export let months: App.LowestFareByMonthAndDestination;
	export let calendar: App.FaresByDateOfDestination;
	export let module: Directus.FareModule;

	$: fareCards =
		$selectedDestination && $selectedDaysStore
			? Object.keys(months[$selectedDestination.iata_code][$selectedDaysStore])
					.map((name) => ({
						monthYear: name,
						fare: months[$selectedDestination.iata_code][$selectedDaysStore][name],
						count: Object.keys(calendar[$selectedDestination.iata_code][$selectedDaysStore][name])
							.length
					}))
					.sort(
						(a, b) =>
							parseDate(a.fare.departure).getMilliseconds() -
							parseDate(b.fare.departure).getMilliseconds()
					)
			: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

<ul>
	{#each fareCards as card}
		{@const { count, fare, monthYear } = card}
		<li>
			<FareCard {fare} {count} {monthYear} {labels} store="calendar"></FareCard>
		</li>
	{:else}
		<li>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['instructions']}
			</Heading>
		</li>
	{/each}
</ul>
