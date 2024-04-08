<script lang="ts">
	import { getMonthName, parseDate } from '$lib/public/utils';
	import Icon from './icon.svelte';
	import Carret from '$lib/assets/icon-carret-down.svg?raw';
	import Isotipo from '$lib/assets/tarifas-viaja-panama-isotipo.svg?raw';
	import SkeletonLine from './skeleton-line.svelte';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let skeleton: boolean | null | undefined;
	export let isLowest: boolean | null | undefined = undefined;
	export let isSelected: boolean;
	export let pulse: boolean = false;
</script>

{#if skeleton}
	<div class="calendar:h-112 grid fare-card--month h-84 opacity-60 px-8 py-8 sm:h-56 w-full">
		<div class="[grid-area:month]">
			<SkeletonLine width="120px" height="24px" {pulse}></SkeletonLine>
		</div>
		<div class="hidden calendar:block calendar:[grid-area:lowes] h-24"></div>
		<div class="[grid-area:froms] mb-4">
			<SkeletonLine width="50px" height="12px" {pulse}></SkeletonLine>
		</div>
		<div class="[grid-area:crncy]">
			<SkeletonLine width="50px" height="12px" {pulse}></SkeletonLine>
		</div>
		<span class="[grid-area:icons] calendar:hidden ml-4 sm:ml-8">
			<SkeletonLine width="24px" height="24px" {pulse}></SkeletonLine>
		</span>
	</div>
{:else}
	<span
		class="calendar:p-12 fare-card--month font-heading grid group-focus:*:!text-common-white group-hover:*:!text-common-white h-full px-8 py-8 text-12/16 text-common-white text-right transition-colors w-full"
	>
		<span class="font-heading-medium [grid-area:month] self-center text-20/24 text-left uppercase">
			{getMonthName(parseDate(fare.departure))}
		</span>
		{#if isLowest}
			<span
				class="[grid-area:lowes] flex font-heading-bold gap-4 items-center sm:self-center sm:ml-4 text-secondary"
				class:text-common-white={isSelected}
				class:text-secondary={!isSelected}
			>
				<Icon data={Isotipo} class="fill-current w-16"></Icon>
				<span>{labels['lowestFare']}</span>
			</span>
		{/if}
		<span class="[grid-area:froms] self-end">{labels['from']}</span>
		<span class="[grid-area:crncy] mb-4">{labels['currency']}</span>
		<span
			class="[grid-area:price] font-heading-bold ml-4 self-end text-32/40"
			class:text-common-white={isSelected || !isLowest}
			class:text-secondary={!isSelected && isLowest}
		>
			${fare.price}
		</span>
		<span
			class="[grid-area:icons] self-center calendar:hidden ml-4 sm:ml-8 transition-transform"
			class:rotate-180={isSelected}
		>
			<Icon data={Carret} class="size-24 fill-grey-200"></Icon>
		</span>
	</span>
{/if}

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
