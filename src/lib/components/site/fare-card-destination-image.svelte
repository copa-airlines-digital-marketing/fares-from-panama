<script lang="ts">
	import { destinationsStore } from '$lib/public/store';
	import { formatDateForDisplay, getShoppingEngingeURL, parseDate } from '$lib/public/utils';
	import SkeletonLine from './skeleton-line.svelte';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let skeleton: boolean | null | undefined = undefined;
	export let pulse: boolean = false;
</script>

{#if skeleton}
	<div
		class="aspect-video bg-grey-300 sm:aspect-[4/3] fare-card--destination-image grid gap-x-4 h-full overflow-hidden portrait-card rounded-2xl shadow-tiny w-full opacity-60"
		class:animate-pulse={pulse}
	>
		<div class="col-[content] row-[dest]">
			<SkeletonLine width="50%"></SkeletonLine>
		</div>
		<div class="col-[content] row-[date]">
			<SkeletonLine width="75%"></SkeletonLine>
		</div>
		<div class="col-[content] justify-self-end row-[taxs]">
			<SkeletonLine width="160px"></SkeletonLine>
		</div>
		<div class="col-[content] justify-self-end row-[labl]">
			<SkeletonLine width="120px"></SkeletonLine>
		</div>
		<div class="col-[content] justify-self-end row-[crcy]">
			<SkeletonLine width="120px"></SkeletonLine>
		</div>
	</div>
{:else}
	{@const { destination, departure, price, taxes } = fare}
	<a
		class="aspect-video sm:aspect-[4/3] fare-card--destination-image font-heading grid gap-x-4 h-full group overflow-hidden rounded-2xl shadow-tiny text-12/16 text-common-white w-full"
		href={getShoppingEngingeURL(fare)}
		target="_blank"
	>
		<img
			class="[grid-area:image] object-cover h-full w-full"
			src="https://cm-marketing.directus.app/assets/{$destinationsStore[destination]
				.main_image}?width=800&height=600&fit=cover"
			alt=""
		/>
		<span class="[grid-area:image] bg-common-black/40 group-hover:bg-red transition-colors"></span>
		<span class="col-[content] font-heading-medium row-[dest]">
			<span class="text-24/32">{$destinationsStore[destination].translations[0].name}</span>
			({destination}),
			<span class="uppercase">{$destinationsStore[destination].country.code}</span>
		</span>
		<span class="col-[content] mb-8 row-[date]">
			{formatDateForDisplay(parseDate(departure))} -
			{formatDateForDisplay(parseDate(departure))} ·
			{labels['roundTrip']}
		</span>
		<span
			class="col-[content] font-heading-medium justify-self-end mt-8 row-[taxs] text-14/20 text-grey-100"
			>{labels['taxesIncluded']}
			<span class="font-heading-bold text-24/32">${taxes}</span></span
		>
		<span class="col-[detail] justify-self-end row-[labl] self-end">{labels['finalPrice']}</span>
		<span class="col-[detail] justify-self-end row-[crcy] self-start">{labels['currency']}</span>
		<span class="col-[price] font-heading-bold row-[labl_/_crcy] text-32/40">${price}</span>
	</a>
{/if}

<style lang="post-css">
	.fare-card--destination-image {
		grid-template-columns: [image-start] 8px [content-start detail-start] 1fr [detail-end price-start] auto [content-end price-end] 8px [image-end];
		grid-template-rows:
			[image-start] 8px
			[dest-start] auto
			[dest-end date-start] auto
			[date-end]1fr
			[taxs-start] auto
			[taxs-end labl-start] auto
			[labl-end crcy-start] auto
			[crcy-end] 8px
			[image-end];
	}
</style>
