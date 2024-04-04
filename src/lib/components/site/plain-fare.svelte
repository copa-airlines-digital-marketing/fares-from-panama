<script lang="ts">
	import { destinationsStore } from '$lib/public/store';
	import { formatDateForDisplay, getShoppingEngingeURL, parseDate } from '$lib/public/utils';
	import SkeletonLine from './skeleton-line.svelte';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let skeleton: boolean | undefined = undefined;
</script>

{#if skeleton}
	<div
		class="auto-rows-auto bg-secondary grid h-152 opacity-60 py-8 px-16 rounded-xl shadow-medium text-12/16 text-common-white"
	>
		<SkeletonLine width="50%"></SkeletonLine>
		<SkeletonLine width="75%"></SkeletonLine>
		<SkeletonLine></SkeletonLine>
		<SkeletonLine></SkeletonLine>
		<SkeletonLine></SkeletonLine>
		<SkeletonLine></SkeletonLine>
	</div>
{:else}
	<a
		href={getShoppingEngingeURL(fare)}
		class="auto-rows-auto bg-secondary font-heading grid grid-cols-[1fr_auto_auto] [grid-template-areas:'dest_dest_dest''dates_dates_dates''taxes_taxes_taxes''._price_value''._currency_value'] gap-x-4 hover:bg-red focus:bg-red py-8 px-16 rounded-xl shadow-medium text-12/16 text-common-white transition data-[skeleton]:opacity-40"
		data-skeleton={skeleton}
	>
		<span class="font-heading-bold [grid-area:dest] text-20/32">
			{$destinationsStore[fare.destination].translations[0].name},
			<span class="uppercase">{$destinationsStore[fare.destination].country.code}</span>
		</span>
		<span class="[grid-area:dates] mb-24">
			{formatDateForDisplay(parseDate(fare.departure))} -
			{formatDateForDisplay(parseDate(fare.return))} ·
			{labels['roundTrip']}
		</span>
		<span class="font-heading-medium [grid-area:taxes] justify-self-end text-14/20 self-end">
			{labels['taxesIncluded']}
			<span class="font-heading-bold text-20/24">{fare.taxes}</span>
		</span>
		<span class="[grid-area:price] justify-self-end leading-4 self-end">
			{labels['finalPrice']}
		</span>
		<span class="[grid-area:currency] justify-self-end leading-4 self-start">
			{labels['currency']}
		</span>
		<span class="font-heading-bold [grid-area:value] justify-self-end self-center text-32/40">
			{fare.price}
		</span>
	</a>
{/if}
