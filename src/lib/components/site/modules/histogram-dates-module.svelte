<script lang="ts">
	import { selectedDaysStore, selectedHistogramMonthStore } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/date-fare.svelte';

	export let section: string;
	export let dates: App.LowestFareByDate;
	export let fares: App.FaresByDate;
	export let module: Directus.FareModule;

	$: sectionDays = $selectedDaysStore[section];

	$: fareCards =
		sectionDays && $selectedHistogramMonthStore
			? Object.keys(dates[sectionDays][$selectedHistogramMonthStore]).map((name) => ({
					dateString: name,
					fare: dates[sectionDays][$selectedHistogramMonthStore][name],
					count: Object.keys(fares[sectionDays][$selectedHistogramMonthStore][name]).length
				}))
			: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

<ul>
	{#each fareCards as card}
		{@const { count, fare, dateString } = card}
		<li>
			<FareCard {fare} {count} {dateString} {labels}></FareCard>
		</li>
	{:else}
		<li>
			<Heading type="display-tiny" style="text-grey-600 text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</li>
	{/each}
</ul>
