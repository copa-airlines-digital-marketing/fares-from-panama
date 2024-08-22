<script lang="ts">
	import {
		formatDateForDisplay,
		getDayAndDate,
		getShoppingEngingeURL,
		isAfter6Months,
		isBeforeSweetSpot,
		isBeforeToday,
		parseDate
	} from '$lib/public/utils';
	import { getContext } from 'svelte';
	import { getDate } from 'date-fns';
	import { isEmpty } from 'ramda';
	import Icon from '$lib/components/site/icon.svelte';
	import Isotipo from '$lib/assets/tarifas-viaja-panama-isotipo.svg?raw';
	import ArmChair from '$lib/assets/icon-solar-armchair-2-bold.svg?raw';
	import type { Writable } from 'svelte/store';

	export let fare: ViajaPanamaFare;
	export let date: Date;
	export let lowest = false;
	export let isTab = false;
	export let alternatives: string | undefined = undefined;
	export let isInMonth = true;

	const labels = getContext<Record<string, string>>('moduleLabels');
	const toastFN = getContext<() => void>('showToast');
	const maxAlerts = getContext<number>('maxAlerts');
	const alertsShown = getContext<Writable<number>>('alertsShown');

	const addToast = (url: string, fare: unknown) => (e: Event) => {
		if (window.dataLayer) window.dataLayer.push({ event: 'fare_click', module: 'Calendar', fare });
		if (!!toastFN && isBeforeSweetSpot(date) && $alertsShown <= maxAlerts) {
			toastFN();
			$alertsShown += 1;
			e.preventDefault();
			setTimeout(() => {
				open(url, '_blank')?.focus();
			}, 2500);
		}
	};
</script>

{#if isInMonth || isBeforeToday(date) || isAfter6Months(date)}
	<div
		class="calendar:aspect-square bg-grey-100 calendar:px-8 calendar:py-4 fare-card--calendar-date font-heading grid group h-full px-16 py-8 rounded-xl text-12/16 text-grey-500 transition-colors w-full"
	>
		<span class="[grid-area:dates] font-heading-medium text-14/20 uppercase">
			{isTab ? getDate(date) : getDayAndDate(date)}
		</span>
	</div>
{:else if isEmpty(fare) && alternatives}
	<div
		class="calendar:aspect-square bg-grey-100 calendar:px-8 calendar:py-4 fare-card--calendar-date font-heading grid group h-full px-16 py-8 rounded-xl text-12/16 text-grey-600 transition-colors w-full"
	>
		<span class="[grid-area:dates] font-heading-medium text-14/20 uppercase">
			{isTab ? getDate(date) : getDayAndDate(date)}
		</span>
		<span class="[grid-area:retrn] flex flex-col">
			<span>{labels['stayNotAvailable']}</span>
			<span>{labels['otherStays']}{alternatives}</span>
		</span>
	</div>
{:else if isEmpty(fare)}
	<div
		class="calendar:aspect-square cursor-default bg-grey-100 calendar:px-8 calendar:py-4 fare-card--calendar-date font-heading grid group h-full px-16 py-8 rounded-xl text-12/16 text-grey-500 transition-colors w-full"
	>
		<div class="[grid-area:dates] font-heading-medium text-14/20 uppercase">
			{isTab ? getDate(date) : getDayAndDate(date)}
		</div>
		<div class="[grid-area:retrn]">
			{labels['dateNotAvailable']}
		</div>
	</div>
{:else if fare.price === 9999999}
	{@const url = getShoppingEngingeURL(fare)}
	<a
		class="calendar:aspect-square bg-primary-ultradark calendar:px-8 calendar:py-4 fare-card--calendar-date focus:bg-red font-heading grid group h-full hover:bg-red px-16 py-8 rounded-xl text-12/16 text-common-white transition-colors w-full"
		href={url}
		target="_blank"
		on:click={addToast(url, fare)}
	>
		<span class="[grid-area:dates] font-heading-medium text-14/20 uppercase">
			{isTab ? getDate(date) : getDayAndDate(date)}
		</span>
		<span class="[grid-area:retrn]">
			{labels['fareHigherThanUsual']}
		</span>
		<span
			class="[grid-area:price] justify-self-end group-focus:*:textcomns
group-hover:*:text-common-white self-center"
		>
			{labels['checkPrices']}
		</span>
	</a>
{:else}
	{@const url = getShoppingEngingeURL(fare)}
	<a
		class="calendar:aspect-square bg-primary calendar:px-8 calendar:py-4 fare-card--calendar-date focus:bg-red font-heading grid group h-full hover:bg-red px-16 py-8 rounded-xl text-12/16 text-common-white transition-colors w-full"
		class:bg-secondary={lowest}
		on:click={addToast(url, fare)}
		href={url}
		target="_blank"
	>
		<span class="[grid-area:dates] font-heading-medium text-14/20 uppercase">
			{isTab ? getDate(date) : getDayAndDate(date)}
		</span>
		<span class="[grid-area:retrn] sm:self-center">
			{labels['return']}
			{formatDateForDisplay(parseDate(fare.return))}
			· {labels['roundTrip']}
		</span>
		{#if fare.seats === -1}
			<span class="[grid-area:lowes] calendar:self-start flex font-heading-bold gap-4 items-center">
				<Icon data={ArmChair} class="w-16"></Icon>
				<span>{labels['lowSeats']}</span>
			</span>
		{:else if lowest}
			<span class="[grid-area:lowes] calendar:self-start flex font-heading-bold gap-4 items-center">
				<Icon data={Isotipo} class="fill-current w-16"></Icon>
				<span>{labels['lowestFare']}</span>
			</span>
		{/if}
		<span class="[grid-area:copaf] justify-self-end">
			{labels['copaFare']}
			<span class="calendar:font-heading-bold text-16/24">${fare.fare}</span>
		</span>
		<span
			class="[grid-area:taxes] border-b border-b-grey-200/40 calendar:font-heading-normal font-heading-medium justify-self-end"
		>
			{labels['taxes']}
			<span class="calendar:font-heading-bold text-20/24">${fare.taxes}</span>
		</span>
		<span
			class="[grid-area:price] justify-self-end group-focus:*:textcomns
 group-hover:*:text-common-white"
		>
			{labels['currency']}
			<span class="font-heading-bold text-32/40">${fare.price}</span>
		</span>
	</a>
{/if}

<style lang="postcss">
	.fare-card--calendar-date {
		grid-template-areas: 'dates .' 'retrn retrn' 'lowes copaf' '. taxes' '. price';
		grid-template-columns: 1fr auto;
		grid-template-rows: min-content repeat(4, minmax(0, auto));
	}

	@media (min-width: 600px) {
		.fare-card--calendar-date {
			grid-template-areas: 'dates .' 'retrn copaf' 'lowes taxes' '. price';
			grid-template-columns: 1fr auto;
			grid-template-rows: min-content repeat(1, minmax(0, auto));
		}
	}

	@media (min-width: 1180px) {
		.fare-card--calendar-date {
			grid-template-areas: 'dates' 'retrn' 'lowes' 'copaf' 'taxes' 'price';
			grid-template-columns: 1fr;
			grid-template-rows: repeat(2, minmax(0, auto)) 1fr repeat(3, minmax(0, auto));
		}
	}
</style>
