<script lang="ts">
	import { selectedCalendarMonthStore, selectedHistogramMonthStore } from '$lib/public/store';
	import { getMonthName, parseDate } from '$lib/public/utils';

	export let fare: Directus.Fare;
	export let monthYear: string;
	export let count: number;
	export let store: 'calendar' | 'histogram';
	export let labels: Record<string, string>;

	const { departure, price } = fare;

	const selectMonth = () => {
		store === 'calendar'
			? ($selectedCalendarMonthStore = monthYear)
			: ($selectedHistogramMonthStore = monthYear);
	};
</script>

<button on:click={selectMonth}>
	<span>
		{getMonthName(parseDate(departure))}
	</span>
	<span>{labels['from']}</span>
	<span>{labels['currency']}{price}</span>
</button>
