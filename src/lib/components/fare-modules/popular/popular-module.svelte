<script lang="ts">
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { getContext } from 'svelte';
	import { isEmpty, isNotNil, slice } from 'ramda';
	import StatusWrapper from '$lib/components/skeleton/status-wrapper.svelte';
	import PopularSkeleton from './popular-skeleton.svelte';
	import { formatDateForDisplay, getShoppingEngingeURL, parseDate } from '$lib/public/utils';

	const { all: destinations } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const section: string = getContext('section');

	$: popular = $modules.popular;

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: selectedStayOfSection = $selectedStay[section];
</script>

{#if isNotNil(popular) && !isEmpty(popular) && selectedStayOfSection}
	<ul
		class="auto-rows-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-tiny"
	>
		{#each Object.values(popular[parseInt(selectedStayOfSection)])
			.sort((a, b) => b.score - a.score)
			.slice(0, 12) as fare}
			{@const { destination, departure, price, taxes } = fare}
			<li>
				<a
					href={getShoppingEngingeURL(fare)}
					class="bg-secondary font-heading grid gap-x-4 h-full hover:bg-red fare-card--plain focus:bg-red py-8 px-16 rounded-xl shadow-medium text-12/16 text-common-white transition-colors"
					target="_blank"
				>
					<span class="font-heading-medium [grid-area:dest]">
						<span class="text-20/32">{$destinations[destination].translations[0].name}</span>
						({destination}),
						<span class="uppercase">{$destinations[destination].country.code}</span>
					</span>
					<span class="[grid-area:date] mb-24">
						{formatDateForDisplay(parseDate(departure))} -
						{formatDateForDisplay(parseDate(fare.return))} ·
						{labels['roundTrip']}
					</span>
					<span class="font-heading-medium [grid-area:taxs] justify-self-end text-14/20 self-end">
						{labels['taxesIncluded']}
						<span class="font-heading-bold text-20/24">${taxes}</span>
					</span>
					<span class="[grid-area:labl] justify-self-end leading-4 self-end">
						{labels['finalPrice']}
					</span>
					<span class="[grid-area:crcy] justify-self-end leading-4 self-start">
						{labels['currency']}
					</span>
					<span class="font-heading-bold [grid-area:prce] justify-self-end self-center text-32/40">
						${price}
					</span>
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<div class="relative">
		<PopularSkeleton pulse={isEmpty($modules)}></PopularSkeleton>
		<div class="absolute bg-grey-100/60 blur h-full top-0 w-full"></div>
		<div class="absolute grid h-full place-content-center px-16 py-8 top-0 w-full">
			<StatusWrapper
				name={section}
				{labels}
				theme={'light'}
				fares={isEmpty($modules)}
				days={!$selectedStay[section]}
				noFares={!!selectedStayOfSection && !!popular && !popular[parseInt(selectedStayOfSection)]}
			></StatusWrapper>
		</div>
	</div>
{/if}

<style lang="postcss">
	.fare-card--plain {
		grid-template-areas:
			'dest dest'
			'date date'
			'taxs taxs'
			'labl prce'
			'crcy prce';
		grid-template-columns: 1fr auto;
		grid-template-rows: auto 1fr auto auto auto;
	}
</style>
