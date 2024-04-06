<script lang="ts">
	import { selectedDaysStore } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/interest-fare.svelte';

	export let section: string;
	export let interestLowest: App.LowestFareByInterest;
	export let module: Directus.FareModule;
	export let interestFares: App.InterestFares;

	$: sectionDays = $selectedDaysStore[section];

	$: fareCards = sectionDays
		? Object.keys(interestLowest[sectionDays])
				.map((name) => ({
					interest: name,
					fare: interestLowest[sectionDays][name],
					count: Object.keys(interestFares[sectionDays][name]).length
				}))
				.sort((a, b) => parseInt(a.fare.price) - parseInt(b.fare.price))
		: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

<ul>
	{#each fareCards as card}
		{@const { count, fare, interest } = card}
		<li>
			<FareCard {fare} {interest} {count} {labels}></FareCard>
		</li>
	{:else}
		<li>
			<Heading type="display-tiny" style="text-grey-600 text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</li>
	{/each}
</ul>
