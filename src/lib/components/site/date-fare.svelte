<script lang="ts">
	import { selectedHistogramDateStore } from '$lib/public/store';
	import { getFullDateName, parseDate } from '$lib/public/utils';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let dateString: string;
	export let count: number;

	const { departure, price } = fare;

	const selectDate = () => {
		$selectedHistogramDateStore = dateString;
	};
</script>

<button on:click={selectDate}>
	<span>{getFullDateName(parseDate(dateString))}</span>
	<span>{count} {labels['destinations']}</span>
	<span>{labels['from']}</span>
	<span>{labels['currency']}{price}</span>
</button>
