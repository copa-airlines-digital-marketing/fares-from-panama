<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { getContext, onMount } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getFareModulesContext } from '../context';
	import { isEmpty } from 'ramda';
	import HistogramMonthCard from './histogram-month-card.svelte';
	import HistogramDatesTabs from './histogram-dates-tabs.svelte';
	import { isAfter6Months, parseDeparture, say } from '$lib/public/utils';
	import type { faresReturnSchema } from '$lib/public/utils/fares';
	import { requestData } from '$lib/public/utils/request-data';
	import { pathOr } from 'ramda';
	import { writable, type Writable } from 'svelte/store';
	import { pipe } from 'ramda';
	import { filter } from 'ramda';
	import { isNotNil } from 'ramda';
	import { head } from 'ramda';
	import { prop } from 'ramda';
	import { keys } from 'ramda';
	import { tap } from 'ramda';

	const section = getContext<string>('section');
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: histogramMonths = $modules.histogramMonths;

	const getFirstMonth = pipe(filter(isNotNil), keys, head);

	let current: Writable<string> = writable(
		getFirstMonth($modules.histogramMonths[$selectedStay[section]])
	);

	$: selectedStayOfSection = $selectedStay[section];

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	const faresModules = getFareModulesContext();

	const handleMonthClick = (fare: faresReturnSchema, month: string) => () => {
		if (!fare) return;

		const { days, departure } = fare;

		if (window.dataLayer)
			window.dataLayer.push({ event: 'fare_click', module: 'Histogram Month', month, fare });

		debounce(() => {
			requestData('histogram', { days, departure }).then((value) => {
				if (!value || !Array.isArray(value) || isEmpty(value)) return;

				const histogram = value[0];

				faresModules.set({
					...$faresModules,
					histogram
				});
			});
		});
	};

	onMount(() => {
		handleMonthClick(
			pathOr(undefined, [$selectedStay[section], $current], histogramMonths),
			$current
		)();
	});
</script>

{#if selectedStayOfSection}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const months = histogramMonths[stay]}
	<Tabs.Root bind:value={$current}>
		<Tabs.List class="auto-cols-fr gap-8 grid grid-rows-1 grid-flow-col">
			{#if !isEmpty(months) && months != null}
				{#each Object.keys(months) as key (key)}
					{@const fare = months[key]}
					{#if !isAfter6Months(parseDeparture(fare))}
						<Tabs.Trigger
							value={key}
							class="border-2 border-primary-ultradark group rounded-lg hover:bg-secondary hover:border-secondary transition-colors data-[state='active']:bg-red data-[state='active']:border-red shadow-tiny"
							on:click={handleMonthClick(fare, key)}
						>
							<HistogramMonthCard {fare} selected={$current === key} />
						</Tabs.Trigger>
					{/if}
				{/each}
			{:else}
				<div class="text-center text-common-white">
					{labels['noFares']}
				</div>
			{/if}
		</Tabs.List>
		{#if !isEmpty(months) && months != null}
			{#each Object.keys(months) as key (key)}
				<Tabs.Content value={key}>
					<HistogramDatesTabs month={key}></HistogramDatesTabs>
				</Tabs.Content>
			{/each}
		{:else}
			<div class="text-center text-common-white">
				{labels['noFares']}
			</div>
		{/if}
	</Tabs.Root>
{/if}
