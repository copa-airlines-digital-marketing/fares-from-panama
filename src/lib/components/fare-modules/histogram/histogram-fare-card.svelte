<script lang="ts">
	import {
		formatDateForDisplay,
		getShoppingEngingeURL,
		isBeforeSweetSpot,
		parseDate
	} from '$lib/public/utils';
	import { getContext } from 'svelte';
	import { getDestinationsContext } from '$lib/components/destination/context';

	export let fare: ViajaPanamaFare;

	const labels = getContext<Record<string, string>>('moduleLabels');

	const { all: destinations } = getDestinationsContext();

	const toastFN = getContext<() => void>('showToast');

	const addToast = (url: string) => (e: Event) => {
		if (!!toastFN && isBeforeSweetSpot(parseDate(fare.departure))) {
			toastFN();
			e.preventDefault();
			setTimeout(() => {
				open(url, '_blank')?.focus();
			}, 2500);
		}
	};
</script>

<a
	class="aspect-video sm:aspect-[4/3] fare-card--destination-image font-heading grid gap-x-4 h-full group overflow-hidden rounded-2xl shadow-tiny text-12/16 text-common-white w-full"
	href={getShoppingEngingeURL(fare)}
	target="_blank"
	on:click={addToast(getShoppingEngingeURL(fare))}
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
		<span class="text-24/32"
			>{$destinations[fare.destination]?.translations[0]?.name ?? 'not found'}</span
		>
		({fare.destination}),
		<span class="uppercase">{$destinations[fare.destination]?.country?.code ?? 'not found'}</span>
	</span>
	<span class="col-[content] mb-8 row-[date]">
		{formatDateForDisplay(parseDate(fare.departure))} -
		{formatDateForDisplay(parseDate(fare.return))} ·
		{labels['roundTrip']}
	</span>
	<span
		class="col-[content] font-heading-medium justify-self-end mt-8 row-[taxs] text-14/20 text-grey-100"
		>{labels['taxesIncluded']}
		<span class="font-heading-bold text-24/32">${fare.taxes}</span></span
	>
	<span class="col-[detail] justify-self-end row-[labl] self-end">{labels['finalPrice']}</span>
	<span class="col-[detail] justify-self-end row-[crcy] self-start">{labels['currency']}</span>
	<span class="col-[price] font-heading-bold row-[labl_/_crcy] text-32/40">${fare.price}</span>
</a>

<style lang="postcss">
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
