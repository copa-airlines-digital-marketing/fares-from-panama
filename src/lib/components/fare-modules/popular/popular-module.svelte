<script lang="ts">
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getContext } from 'svelte';
	import { isEmpty, isNotNil } from 'ramda';
	import StatusWrapper from '$lib/components/skeleton/status-wrapper.svelte';
	import PopularSkeleton from './popular-skeleton.svelte';
	import type { DestinationReturnSchema } from '$lib/public/utils/destinations';
	import { getLowestFaresContext } from '$lib/public/modules/context';
	import InterestFareCard from '../interest/interest-fare-card.svelte';

	const { selected: selectedDestination } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const lowestsFares = getLowestFaresContext();

	const section: string = getContext('section');

	$: popular = $lowestsFares;

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: selectedStayOfSection = $selectedStay[section];

	const handleCardClick = (destination: DestinationReturnSchema, fare: unknown) => () => {
		if (window.dataLayer) window.dataLayer.push({ event: 'fare_click', module: 'Popular', fare });
		$selectedDestination = destination;
	};
</script>

{#if isNotNil(popular) && !isEmpty(popular) && selectedStayOfSection}
	<ul
		class="auto-rows-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-tiny"
	>
		{#each Object.values(popular[parseInt(selectedStayOfSection)])
			.sort((a, b) => b.score - a.score)
			.slice(0, 12) as fare}
			<li>
				<InterestFareCard {fare}></InterestFareCard>
			</li>
		{/each}
	</ul>
{:else}
	<div class="relative">
		<PopularSkeleton pulse={isEmpty($lowestsFares)}></PopularSkeleton>
		<StatusWrapper
			name={section}
			{labels}
			theme={'light'}
			fares={isEmpty($lowestsFares)}
			days={!$selectedStay[section]}
			noFares={!!selectedStayOfSection && !!popular && !popular[parseInt(selectedStayOfSection)]}
		></StatusWrapper>
	</div>
{/if}

<style lang="postcss">
	.fare-card--plain {
		grid-template-areas:
			'dest dest dest'
			'date date date'
			'labl prce cta'
			'crcy prce cta';
		grid-template-columns: auto auto 1fr;
		grid-template-rows: auto 1fr auto auto;
	}
</style>
