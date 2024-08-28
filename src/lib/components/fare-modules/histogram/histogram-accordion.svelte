<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getFareModulesContext } from '../context';
	import { isEmpty } from 'ramda';
	import HistogramMonthCard from './histogram-month-card.svelte';
	import HistogramDatesTabs from './histogram-dates-tabs.svelte';
	import { slide } from 'svelte/transition';
	import { isAfter6Months, parseDeparture } from '$lib/public/utils';
	import { requestData } from '$lib/public/utils/request-data';
	import type { faresReturnSchema } from '$lib/public/utils/fares';

	const section = getContext<string>('section');
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: histogramMonths = $modules.histogramMonths;

	$: histogram = $modules.histogram;

	let current: string;

	$: selectedStayOfSection = $selectedStay[section];

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	const faresModules = getFareModulesContext();

	const handleMonthClick = (fare: faresReturnSchema, month: string) => () => {
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
</script>

{#if selectedStayOfSection}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const months = histogramMonths[stay]}
	<Accordion.Root bind:value={current}>
		{#if !isEmpty(months) && months != null}
			{#each Object.keys(months) as key (key)}
				{@const fare = months[key]}
				{#if !isAfter6Months(parseDeparture(fare))}
					<Accordion.Item value={key}>
						<Accordion.Header>
							<Accordion.Trigger
								value={key}
								class="w-full border-b border-b-primary-ultradark group focus:bg-secondary focus:border-secondary hover:bg-secondary hover:border-secondary outline-none transition-colors"
								on:click={handleMonthClick(fare, key)}
							>
								<HistogramMonthCard {fare} selected={current === key} />
							</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content transition={slide}>
							<HistogramDatesTabs month={key}></HistogramDatesTabs>
						</Accordion.Content>
					</Accordion.Item>
				{/if}
			{/each}
		{:else}
			<div class="text-center text-common-white">
				{labels['noFares']}
			</div>
		{/if}
	</Accordion.Root>
{/if}
