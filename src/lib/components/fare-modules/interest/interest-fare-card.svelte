<script lang="ts">
	import { getContext } from 'svelte';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import type { DestinationReturnSchema } from '$lib/public/utils/destinations';

	export let fare: ViajaPanamaFare;

	const labels = getContext<Record<string, string>>('moduleLabels');

	const { all: destinations, selected } = getDestinationsContext();

	const handleCardClick = (destination: DestinationReturnSchema) => () => {
		if (window.dataLayer)
			window.dataLayer.push({ event: 'fare_click', module: 'Interest Fare', fare });
		$selected = destination;
	};
</script>

<a
	class="aspect-video sm:aspect-[4/3] fare-card--destination-image font-heading grid gap-x-4 h-full group overflow-hidden rounded-2xl shadow-tiny text-12/16 text-common-white w-full"
	href="#fechas"
	on:click={handleCardClick($destinations[fare.destination])}
>
	<img
		loading="lazy"
		class="[grid-area:image] object-cover h-full w-full"
		src="https://cm-marketing.directus.app/assets/{$destinations[fare.destination]
			.main_image}?width=800&height=600&fit=cover"
		alt=""
	/>
	<span
		class="[grid-area:image] bg-common-black/40 group-hover:bg-red group-focus:bg-red transition-colors"
	></span>
	<span class="col-[content] font-heading-medium row-[dest]">
		<span class="text-20/24"
			>{$destinations[fare.destination]?.translations[0]?.name ?? 'not found'},</span
		>
		<span>{$destinations[fare.destination]?.country?.translations[0]?.name ?? 'not found'}</span>
	</span>
	<span class="col-[content] row-[date]">
		{labels['roundTrip']}
	</span>
	<span class="col-[detail] justify-self-end row-[labl] self-end">{labels['from']}</span>
	<span class="col-[detail] justify-self-end row-[crcy] self-start">{labels['currency']}</span>
	<span class="col-[price] font-heading-bold row-[labl_/_crcy] text-32/40">${fare.price}</span>
	<span class="col-[content_/_price] row-[tax] text-right">
		{labels['IncludeTaxes']}
	</span>
	<span class="col-[cta] row-[labl_/_tax] text-16/24 place-self-end gap-4 font-heading-medium">
		{labels['viewDates']}
	</span>
</a>

<style lang="postcss">
	.fare-card--destination-image {
		grid-template-columns: [image-start] 8px [content-start detail-start] auto [detail-end price-start] auto [price-end cta-start] 1fr [cta-end content-end] 8px [image-end];
		grid-template-rows:
			[image-start] 8px
			[dest-start] auto
			[dest-end date-start] auto
			[date-end] 1fr
			[labl-start] auto
			[labl-end crcy-start] auto
			[crcy-end tax-start] auto
			[tax-end] 8px
			[image-end];
	}
</style>
