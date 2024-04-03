<script lang="ts">
	import { selectedDaysStore } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/month-fare.svelte';

	export let months: App.LowestFareByMonth;
	export let dates: App.LowestFareByDate;
	export let module: Directus.FareModule;

	$: fareCards = $selectedDaysStore
		? Object.keys(months[$selectedDaysStore]).map((name) => ({
				monthYear: name,
				fare: months[$selectedDaysStore][name],
				count: Object.keys(dates[$selectedDaysStore][name]).length
			}))
		: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

<ul>
	{#each fareCards as card}
		{@const { count, fare, monthYear } = card}
		<li>
			<FareCard {fare} {count} {monthYear} {labels} store="histogram"></FareCard>
		</li>
	{:else}
		<li>
			<Heading type="display-tiny" style="text-grey-600 text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</li>
	{/each}
</ul>
