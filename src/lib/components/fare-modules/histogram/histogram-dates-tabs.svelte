<script lang="ts">
	import { ScrollArea, Tabs } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getFareModulesContext } from '../context';
	import { fly } from 'svelte/transition';
	import { isEmpty, isNotNil, max, min } from 'ramda';
	import HistogramDayCard from './histogram-day-card.svelte';
	import HistogramFareCard from './histogram-fare-card.svelte';
	import { isBeforeToday, parseDate } from '$lib/public/utils';

	export let month: string;

	const { selected: selectedStay } = getDaysContext();
	const section = getContext<string>('section');
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: histogramDays = $modules.histogramDays;

	$: histogram = $modules.histogram;

	$: selectedStayOfSection = $selectedStay[section];

	$: stay = isNotNil(selectedStayOfSection) ? parseInt(selectedStayOfSection) : 0;

	$: days = isNotNil(selectedStayOfSection) ? histogramDays[stay][month] : {};

	$: name = undefined;

	$: maxShow = name ? 12 : 12;

	const addShowMax = () => (maxShow += 12);

	const getPriceProp = ({ price }: ViajaPanamaFare) => parseInt(price);
</script>

<Tabs.Root bind:value={name}>
	<ScrollArea.Root class="relative w-full pb-tiny pt-roomy" dir="ltr">
		<ScrollArea.Viewport class="w-full">
			<ScrollArea.Content>
				<Tabs.List class="auto-cols-auto gap-4 grid grid-flow-col grid-rows-1 items-end">
					{#each Object.keys(days) as key (key)}
						{@const date = days[key]}
						{@const fares = histogram[stay][month][key]}
						{@const daysPrice = Object.values(days)
							.filter((value) => !isEmpty(value))
							.map(getPriceProp)}
						{@const lowest = daysPrice.reduce(min, Infinity)}
						{@const highest = daysPrice.reduce(max, 0)}
						<Tabs.Trigger
							disabled={isEmpty(date) || isBeforeToday(parseDate(date.departure))}
							value={key}
							class="group min-w-32 outline-none"
						>
							<HistogramDayCard
								count={Object.keys(fares).filter((key) => fares[key].price !== '9999999').length}
								fare={date}
								dateKey={key}
								lowest={100}
								max={300}
								selected={name === key}
							></HistogramDayCard>
						</Tabs.Trigger>
					{:else}
						<div class="text-center text-common-white">
							{labels['noFares']}
						</div>
					{/each}
				</Tabs.List>
			</ScrollArea.Content>
		</ScrollArea.Viewport>
		<ScrollArea.Scrollbar
			orientation="horizontal"
			class="flex w-full h-12 touch-none select-none rounded-full border-t border-t-transparent transition-all ease-in-out hover:bg-secondary/30"
		>
			<ScrollArea.Thumb
				class="relative rounded-full bg-secondary opacity-60 transition-opacity hover:opacity-100"
			/>
		</ScrollArea.Scrollbar>
	</ScrollArea.Root>
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
	{:else}
		<div class="text-center text-common-white">
			{labels['noFares']}
		</div>
	{/each}
</Tabs.Root>
