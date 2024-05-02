<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { fly } from 'svelte/transition';
	import { identity, isEmpty, isNotNil, max, maxBy, min, minBy, reduce, sort } from 'ramda';
	import HistogramDayCard from './histogram-day-card.svelte';
	import HistogramFareCard from './histogram-fare-card.svelte';
	import { isViajaPanamaFare } from '$lib/public/utils/fares';

	export let month: string;

	const { all: destinations } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const section = getContext<string>('section');
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: histogramDays = $modules.histogramDays;

	$: histogram = $modules.histogram;

	$: selectedStayOfSection = $selectedStay[section];

	$: name = undefined;

	$: maxShow = name ? 12 : 12;

	const addShowMax = () => (maxShow += 12);

	const getPriceProp = ({ price }: ViajaPanamaFare) => parseInt(price);
</script>

{#if isNotNil(selectedStayOfSection)}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const days = histogramDays[stay][month]}
	<Tabs.Root bind:value={name} class="my-roomy">
		<Tabs.List class="auto-cols-fr gap-4 grid grid-flow-col grid-rows-1 items-end max-w-full my-16">
			{#if !isEmpty(days) && days != null}
				{#each Object.keys(days) as key (key)}
					{@const date = days[key]}
					{@const fares = histogram[stay][month][key]}
					{@const daysPrice = Object.values(days)
						.filter((value) => !isEmpty(value))
						.map(getPriceProp)}
					{@const lowest = daysPrice.reduce(min, Infinity)}
					{@const highest = daysPrice.reduce(max, 0)}
					<Tabs.Trigger disabled={isEmpty(date)} value={key} class="group">
						<HistogramDayCard
							count={Object.keys(fares).filter((key) => fares[key].price !== '9999999').length}
							fare={date}
							dateKey={key}
							{lowest}
							max={highest}
							selected={name === key}
						></HistogramDayCard>
					</Tabs.Trigger>
				{/each}
			{:else}
				<div class="text-center text-common-white">
					{labels['noFares']}
				</div>
			{/if}
		</Tabs.List>
		{#if !isEmpty(days) && days != null}
			{#each Object.keys(days) as key (key)}
				{@const fares = histogram[stay][month][key]}
				{@const validFares = Object.values(fares)
					.filter((fare) => !!fare && !isEmpty(fare) && fare.price !== '9999999')
					.sort((a, b) => parseInt(a.price) - parseInt(b.price))}
				<Tabs.Content value={key} class="">
					<ul
						class="auto-rows-fr bg-backgound-paper gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8"
					>
						{#each validFares as fare, i}
							{#if i < maxShow}
								<li in:fly={{ duration: 350, y: '-100%' }} out:fly={{ duration: 350, y: '-100%' }}>
									<HistogramFareCard {fare} />
								</li>
							{/if}
						{/each}
					</ul>
					{#if validFares.length > 12 && maxShow < validFares.length}
						<div class="flex justify-center my-tiny" transition:fly>
							<button
								class="button button-solid-light text-common-white"
								on:click={addShowMax}
								type="button"
							>
								{labels['showMoreDestinations']}
							</button>
						</div>
					{/if}
				</Tabs.Content>
			{/each}
		{:else}
			<div class="text-center text-common-white">
				{labels['noFares']}
			</div>
		{/if}
	</Tabs.Root>
{/if}
