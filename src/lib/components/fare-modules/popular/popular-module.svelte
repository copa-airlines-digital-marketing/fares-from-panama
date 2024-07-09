<script lang="ts">
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { getContext } from 'svelte';
	import { isEmpty, isNotNil } from 'ramda';
	import StatusWrapper from '$lib/components/skeleton/status-wrapper.svelte';
	import PopularSkeleton from './popular-skeleton.svelte';
	import type { DestinationReturnSchema } from '$lib/public/utils/destinations';

	const { all: destinations, selected: selectedDestination } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const section: string = getContext('section');

	$: popular = $modules.popular;

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
			{@const { destination, price } = fare}
			<li>
				<a
					href="#fechas"
					class="bg-secondary font-heading grid gap-x-4 h-full hover:bg-red fare-card--plain focus:bg-red py-8 px-16 rounded-xl shadow-medium text-12/16 text-common-white transition-colors"
					on:click={handleCardClick($destinations[destination], fare)}
				>
					<span class="font-heading-medium [grid-area:dest]">
						<span class="text-20/32">{$destinations[destination].translations[0].name}</span>
						({destination}),
						<span class="uppercase">{$destinations[destination].country.code}</span>
					</span>
					<span class="[grid-area:date] mb-24">
						{labels['roundTrip']}
					</span>
					<span class="[grid-area:labl] justify-self-end leading-4 self-end">
						{labels['from']}
					</span>
					<span class="[grid-area:crcy] justify-self-end leading-4 self-start">
						{labels['currency']}
					</span>
					<span class="font-heading-bold [grid-area:prce] justify-self-end self-center text-32/40">
						${price}
					</span>
					<span
						class="col-[cta] row-[labl_/_crcy] text-16/24 place-self-end gap-4 font-heading-medium"
					>
						{labels['viewDates']}
					</span>
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<div class="relative">
		<PopularSkeleton pulse={isEmpty($modules)}></PopularSkeleton>
		<StatusWrapper
			name={section}
			{labels}
			theme={'light'}
			fares={isEmpty($modules)}
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
