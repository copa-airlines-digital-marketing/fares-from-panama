<script lang="ts">
	import { getMonthName, isBeforeSweetSpot, parseDate } from '$lib/public/utils';
	import { getContext } from 'svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import Carret from '$lib/assets/icon-carret-down.svg?raw';
	import Isotipo from '$lib/assets/tarifas-viaja-panama-isotipo.svg?raw';
	import type { Writable } from 'svelte/store';

	export let fare: ViajaPanamaFare;
	export let selected = false;
	export let lowest = false;

	const labels = getContext<Record<string, string>>('moduleLabels');
</script>

<span
	class="calendar:p-12 fare-card--month font-heading grid group-focus:*:!text-common-white group-hover:*:!text-common-white h-full px-8 py-8 text-12/16 text-common-white text-right transition-colors w-full"
>
	<span class="font-heading-medium [grid-area:month] self-center text-20/24 text-left uppercase">
		{getMonthName(parseDate(fare.departure))}
	</span>
	{#if lowest && fare.price !== '9999999'}
		<span
			class="[grid-area:lowes] flex font-heading-bold gap-4 items-center sm:self-center sm:ml-4 text-secondary"
			class:text-common-white={selected}
			class:text-secondary={!selected}
		>
			<Icon data={Isotipo} class="fill-current w-16"></Icon>
			<span>{labels['lowestFare']}</span>
		</span>
	{/if}
	{#if fare.price !== '9999999'}
		<span class="[grid-area:froms] self-end">{labels['from']}</span>
		<span class="[grid-area:crncy] mb-4">{labels['currency']}</span>
		<span
			class="[grid-area:price] font-heading-bold ml-4 self-end text-32/40"
			class:text-common-white={selected || !lowest}
			class:text-secondary={!selected && lowest}
		>
			${fare.price}
		</span>
	{/if}
	<span
		class="[grid-area:icons] self-center calendar:hidden ml-4 sm:ml-8 transition-transform"
		class:rotate-180={selected}
	>
		<Icon data={Carret} class="size-24 fill-grey-200"></Icon>
	</span>
</span>

<style lang="postcss">
	.fare-card--month {
		grid-template-areas: 'month month month month' 'lowes froms price icons' '. crncy price icons';
		grid-template-columns: 1fr auto auto auto;
		grid-template-rows: auto 1fr auto;
	}

	@media (min-width: 600px) {
		.fare-card--month {
			grid-template-areas: 'month lowes froms price icons' 'month lowes crncy price icons';
			grid-template-columns: auto 1fr auto auto auto;
			grid-template-rows: 1fr auto;
		}
	}

	@media (min-width: 1180px) {
		.fare-card--month {
			grid-template-areas: 'month month month' 'lowes lowes lowes' '. froms price' '. crncy price';
			grid-template-columns: 1fr auto auto;
			grid-template-rows: auto 1fr auto auto;
		}
	}
</style>
