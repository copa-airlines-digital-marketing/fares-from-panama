<script lang="ts">
	import { ScrollArea, Tabs } from 'bits-ui';
	import { getContext, onMount } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getFareModulesContext } from '../context';
	import { fly } from 'svelte/transition';
	import { isEmpty, isNil, isNotNil, max, min, sort } from 'ramda';
	import HistogramDayCard from './histogram-day-card.svelte';
	import HistogramFareCard from './histogram-fare-card.svelte';
	import { datesDif, isBeforeSweetSpot, isBeforeToday, parseDate, say } from '$lib/public/utils';
	import type { Writable } from 'svelte/store';
	import Icon from '$lib/components/site/icon.svelte';
	import Scroll from '$lib/assets/icon-solar-round-double-alt-arrow-left-bold.svg?raw';
	import { quintInOut } from 'svelte/easing';
	import PopularSkeleton from '../popular/popular-skeleton.svelte';
	import { pipe } from 'ramda';
	import { filter } from 'ramda';
	import { keys } from 'ramda';
	import { head } from 'ramda';
	import { not } from 'ramda';
	import { tap } from 'ramda';

	export let month: string;

	const { selected: selectedStay } = getDaysContext();
	const section = getContext<string>('section');
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	const getFirstDate = pipe(filter(pipe(isEmpty, not)), keys, head);

	$: histogramDays = $modules.histogramDays;

	$: histogram = $modules.histogram;

	$: selectedStayOfSection = $selectedStay[section] && parseInt($selectedStay[section]);

	let name = getFirstDate($modules.histogramDays[$selectedStay[section]][month]);

	$: maxShow = name ? 12 : 12;

	const addShowMax = () => (maxShow += 12);

	const toastFN = getContext<() => void>('showToast');
	const maxAlerts = getContext<number>('maxAlerts');
	const alertsShown = getContext<Writable<number>>('alertsShown');

	const addToast = (dateKey: string) => () => {
		if (window.dataLayer)
			window.dataLayer.push({ event: 'fare_click', module: 'Histogram Date', dateKey });
		if (!!toastFN && isBeforeSweetSpot(parseDate(dateKey)) && $alertsShown <= maxAlerts) {
			toastFN();
			$alertsShown += 1;
		}
	};

	const indicated = getContext<Writable<number>>('scrollIndicator');

	let scrollIndicator = false;

	onMount(() => {
		if ($indicated < 2) {
			setTimeout(() => {
				scrollIndicator = true;
			}, 350);
			setTimeout(() => {
				scrollIndicator = false;
			}, 1850);
			$indicated += 1;
		}
	});
</script>

{#if selectedStayOfSection}
	<Tabs.Root bind:value={name}>
		<ScrollArea.Root class="relative w-full pb-tiny pt-roomy" type="auto" dir="ltr">
			<ScrollArea.Viewport class="w-full">
				<ScrollArea.Content>
					<Tabs.List
						class="auto-cols-auto gap-4 grid grid-flow-col grid-rows-1 items-end min-h-216"
					>
						{#each Object.keys(histogramDays[selectedStayOfSection][month]).sort(datesDif) as key (key)}
							<Tabs.Trigger
								disabled={isBeforeToday(parseDate(key))}
								value={key}
								class="group min-w-32 outline-none"
								on:click={addToast(key)}
							>
								<HistogramDayCard
									fare={histogramDays[selectedStayOfSection][month][key]}
									dateKey={key}
									lowest={110}
									max={500}
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
			{#if scrollIndicator}
				<div
					class="absolute backdrop-blur-sm bg-backgound-paper/60 flex-col gap-4 h-full items-center justify-center px-16 top-1/2 -translate-y-1/2 right-0 text-primary flex histogram:hidden"
					transition:fly={{ x: 10, duration: 750, easing: quintInOut }}
				>
					<Icon data={Scroll} class="animate-pulse size-24"></Icon>
					<p>{labels['moreFares']}</p>
				</div>
			{/if}
			<ScrollArea.Scrollbar
				orientation="horizontal"
				class="flex w-full h-12 touch-none select-none rounded-full border-t border-t-transparent transition-all ease-in-out hover:bg-secondary/30"
			>
				<ScrollArea.Thumb
					class="relative rounded-full bg-secondary opacity-60 transition-opacity hover:opacity-100"
				/>
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
		{#if !isEmpty(histogram) && isNotNil(histogram) && isNotNil(histogram[selectedStayOfSection]) && isNotNil(histogram[selectedStayOfSection][month])}
			{#each Object.keys(histogram[selectedStayOfSection][month]) as key (key)}
				{@const fares = histogram[selectedStayOfSection][month][key]}
				{@const validFares = Object.values(fares)
					.filter((fare) => !!fare && !isEmpty(fare) && fare.price !== 9999999)
					.sort((a, b) => a.price - b.price)}
				<Tabs.Content value={key} class="">
					<ul
						class="auto-rows-fr bg-backgound-paper md:bg-grey-75 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8"
					>
						{#each validFares as fare, i}
							{#if i < maxShow}
								<li in:fly={{ duration: 350, y: '-100%' }} out:fly={{ duration: 350, y: '-100%' }}>
									<HistogramFareCard {fare} />
								</li>
							{/if}
						{:else}
							<div class="text-center col-full mb-24">
								{labels['noFares']}
							</div>
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
				<div class="text-center">
					{labels['noFares']}
				</div>
			{/each}
		{:else}
			<PopularSkeleton pulse={true}></PopularSkeleton>
		{/if}
	</Tabs.Root>
{/if}
