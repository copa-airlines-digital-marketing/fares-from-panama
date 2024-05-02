<script lang="ts">
	import { getMonthName, parseDate } from '$lib/public/utils';
	import { getContext } from 'svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import Carret from '$lib/assets/icon-carret-down.svg?raw';

	export let fare: ViajaPanamaFare;
	export let selected = false;

	const labels = getContext<Record<string, string>>('moduleLabels');
</script>

<span
	class="calendar:p-12 fare-card--month font-heading grid group-focus:*:!text-primary-dark group-hover:*:!text-primary-dark h-full px-8 py-8 text-12/16 text-primary-dark text-right transition-colors w-full"
>
	<span class="font-heading-medium [grid-area:month] self-center text-20/24 text-left uppercase">
		{getMonthName(parseDate(fare.departure))}
	</span>
	<span class="[grid-area:froms] self-end">{labels['from']}</span>
	<span class="[grid-area:crncy] mb-4">{labels['currency']}</span>
	<span
		class="[grid-area:price] font-heading-bold ml-4 self-end text-32/40 text-primary-dark"
		class:text-common-white={selected}
	>
		${fare.price}
	</span>
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
