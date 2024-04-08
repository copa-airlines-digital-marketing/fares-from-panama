<script lang="ts">
	import {
		dateIsInMonth,
		formatDateForDisplay,
		getDayAndDate,
		getShoppingEngingeURL,
		isBeforeToday,
		parseDate
	} from '$lib/public/utils';
	import { getDate } from 'date-fns';
	import Isotipo from '$lib/assets/tarifas-viaja-panama-isotipo.svg?raw';
	import Icon from './icon.svelte';

	export let monthOfFare: Date;
	export let date: Date;
	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let skeleton: boolean;
	export let isLowest: boolean;
	export let isTab: boolean;

	const outOfMonth = isBeforeToday(date) || !dateIsInMonth(date, monthOfFare);
</script>

{#if skeleton}
	<div
		class="calendar:aspect-square bg-primary/60 calendar:px-8 calendar:py-4 fare-card--calendar-date grid h-full px-16 py-8 rounded-xl w-full"
	></div>
{:else if outOfMonth && isTab}
	<div
		class="aspect-square bg-grey-200 cursor-default font-heading font-heading-medium opacity-60 px-12 py-8 rounded-lg text-14/20 text-grey-500"
	>
		<span>{getDate(date)}</span>
	</div>
{:else if fare.price === '-1'}
	<div
		class="aspect-square bg-grey-200 cursor-pointer font-heading font-heading-medium opacity-60 px-12 py-8 rounded-lg text-14/20 text-grey-500"
	>
		<span>{getDate(date)}</span>
		<div>precio muy alto</div>
	</div>
{:else if fare.return === '1990-02-12'}
	<div
		class="aspect-square bg-grey-200 cursor-default font-heading font-heading-medium opacity-60 px-12 py-8 rounded-lg text-14/20 text-grey-500"
	>
		<span>{getDate(date)}</span>
		<div>otras fechas</div>
	</div>
{:else if !fare.price}
	<div
		class="aspect-square bg-grey-200 cursor-default font-heading font-heading-medium opacity-60 px-12 py-8 rounded-lg text-14/20 text-grey-500"
	>
		<span>{getDate(date)}</span>
		<div>no dispo</div>
	</div>
{:else}
	{@const { price, taxes } = fare}
	<a
		class="calendar:aspect-square bg-primary calendar:px-8 calendar:py-4 fare-card--calendar-date focus:bg-red font-heading grid group h-full hover:bg-red px-16 py-8 rounded-xl text-12/16 text-common-white transition-colors w-full"
		class:bg-secondary={isLowest}
		href={getShoppingEngingeURL(fare)}
		target="_blank"
	>
		<span class="[grid-area:dates] font-heading-medium text-14/20 uppercase">
			{isTab ? getDate(date) : getDayAndDate(date)}
		</span>
		<span class="[grid-area:retrn] sm:self-end">
			{labels['return']}
			{formatDateForDisplay(parseDate(fare.return))}
			{#if !isTab}
				· {labels['roundTrip']}
			{/if}
		</span>
		{#if isLowest}
			<span class="[grid-area:lowes] calendar:self-start flex font-heading-bold gap-4 items-center">
				<Icon data={Isotipo} class="fill-current w-16"></Icon>
				<span>{labels['lowestFare']}</span>
			</span>
		{/if}
		<span class="[grid-area:copaf] justify-self-end">
			{labels['copaFare']}
			<span class="font-heading-medium text-20/24 calendar:text-12/16">${fare.fare}</span>
		</span>
		<span
			class="[grid-area:taxes] border-b border-b-grey-200/40 calendar:font-heading-normal font-heading-medium justify-self-end"
		>
			{labels['taxes']}
			<span class="calendar:font-heading-bold text-20/24">${taxes}</span>
		</span>
		<span
			class="[grid-area:price] justify-self-end group-focus:*:textcomns
     group-hover:*:text-common-white"
		>
			{labels['currency']}
			<span class="font-heading-bold text-32/40">${price}</span>
		</span>
	</a>
{/if}

<style lang="postcss">
	.fare-card--calendar-date {
		grid-template-areas: 'dates .' 'retrn retrn' 'lowes copaf' '. taxes' '. price';
		grid-template-columns: 1fr auto;
		grid-template-rows: repeat(5, minmax(0, auto));
	}

	@media (min-width: 600px) {
		.fare-card--calendar-date {
			grid-template-areas: 'dates .' 'retrn copaf' 'lowes taxes' '. price';
			grid-template-columns: 1fr auto;
			grid-template-rows: repeat(4, minmax(0, auto));
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
