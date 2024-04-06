<script lang="ts">
	import { destinationsStore } from '$lib/public/store';
	import { formatDateForDisplay, getShoppingEngingeURL, parseDate } from '$lib/public/utils';
	import SkeletonLine from './skeleton-line.svelte';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let skeleton: boolean | undefined = undefined;
	export let pulse = false;
</script>

{#if skeleton}
	<div
		class="auto-rows-auto bg-secondary grid h-152 opacity-60 py-8 px-16 rounded-xl shadow-medium text-12/16 text-common-white"
	>
		<SkeletonLine height="20px" width="50%" {pulse}></SkeletonLine>
		<div class="mb-24">
			<SkeletonLine width="75%" {pulse}></SkeletonLine>
		</div>
		<div class="justify-self-end">
			<SkeletonLine width="160px" {pulse}></SkeletonLine>
		</div>
		<div class="justify-self-end">
			<SkeletonLine width="120px" {pulse}></SkeletonLine>
		</div>
		<div class="justify-self-end">
			<SkeletonLine width="120px" {pulse}></SkeletonLine>
		</div>
	</div>
{:else}
	{@const { destination, departure, price, taxes } = fare}
	<a
		href={getShoppingEngingeURL(fare)}
		class="bg-secondary font-heading grid gap-x-4 h-full hover:bg-red fare-card--plain focus:bg-red py-8 px-16 rounded-xl shadow-medium text-12/16 text-common-white transition-colors"
		target="_blank"
	>
		<span class="font-heading-medium [grid-area:dest]">
			<span class="text-20/32">{$destinationsStore[destination].translations[0].name}</span>
			({destination}),
			<span class="uppercase">{$destinationsStore[destination].country.code}</span>
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
