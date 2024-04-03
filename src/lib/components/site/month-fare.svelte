<script lang="ts">
	import { getMonthName, getShoppingEngingeURL, parseDate } from '$lib/public/utils';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;

	const { departure, price } = fare;
</script>

<button>
	<span
		>{getMonthName(parseDate(departure))}
		)}</span
	>
	<span>{labels['from']}</span>
	<span>{labels['currency']}{price}</span>
</button>
