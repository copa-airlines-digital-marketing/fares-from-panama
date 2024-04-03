<script lang="ts">
	import {
		selectedDaysStore,
		selectedHistogramMonthStore,
		selectedHistogramDateStore
	} from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/copa-fare.svelte';

	export let fares: App.FaresByDate;
	export let module: Directus.FareModule;

	$: fareCards =
		$selectedDaysStore && $selectedDaysStore && $selectedHistogramDateStore
			? Object.values(
					fares[$selectedDaysStore][$selectedHistogramMonthStore][$selectedHistogramDateStore]
				).sort((a, b) => parseInt(a.price) - parseInt(b.price))
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
			<Heading type="display-tiny" style="text-grey-600 text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</li>
	{/each}
</ul>
