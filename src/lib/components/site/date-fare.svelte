<script lang="ts">
	import { getFullDateName, parseDate } from '$lib/public/utils';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let count: number;

	const { departure, price } = fare;
</script>

<button>
	<span>{getFullDateName(parseDate(departure))}</span>
	<span>{count} {labels['destinations']}</span>
	<span>{labels['from']}</span>
	<span>{labels['currency']}{price}</span>
</button>
