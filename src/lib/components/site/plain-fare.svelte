<script lang="ts">
	import { destinationsStore } from '$lib/public/store';
	import { formatDateForDisplay, getShoppingEngingeURL, parseDate } from '$lib/public/utils';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;

	const { destination, departure, price, taxes } = fare;
</script>

<a href={getShoppingEngingeURL(fare)}>
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
	<span>{labels['currency']}{price}</span>
	<span>{labels['taxesIncluded']}{taxes}</span>
</a>
