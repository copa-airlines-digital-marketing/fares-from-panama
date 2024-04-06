<script lang="ts">
	import { selectedDaysStore, selectedInterestStore } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/square-dest-bg-fare.svelte';

	export let section: string;
	export let module: Directus.FareModule;
	export let interestFares: App.InterestFares;

	$: sectionDays = $selectedDaysStore[section];

	$: fareCards =
		sectionDays && $selectedInterestStore
			? Object.values(interestFares[sectionDays][$selectedInterestStore]).sort(
					(a, b) => parseInt(a.price) - parseInt(b.price)
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
			<Heading type="display-tiny" style="text-grey-600 text-center my-normal">
				{labels['selectDayAndInterest']}
			</Heading>
		</li>
	{/each}
</ul>
