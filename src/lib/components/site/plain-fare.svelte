<script lang="ts">
	import { destinationsStore } from '$lib/public/store';
	import { formatDateForDisplay, getShoppingEngingeURL, parseDate } from '$lib/public/utils';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let skeleton = false;

	const { destination, departure, price, taxes } = fare;
</script>

{#if !skeleton}
	<a
		href={getShoppingEngingeURL(fare)}
		class="bg-secondary flex flex-col font-heading gap-4 p-8 rounded-md shadow-medium text-12/16 text-common-white"
	>
		<span
			>{$destinationsStore[destination].translations[0].name},
			<span class="uppercase">{$destinationsStore[destination].country.code}</span>
		</span>
		<span>{labels['roundTrip']}</span>
		<span
			>{formatDateForDisplay(parseDate(departure))} - {formatDateForDisplay(
				parseDate(departure)
			)}</span
		>
		<span>{labels['taxesIncluded']}{taxes}</span>
		<span
			>{labels['finalPrice']}
			<span class="font-heading-bold text-24/32">{price}</span>{labels['currency']}</span
		>
	</a>
{:else}
	<div></div>
{/if}
