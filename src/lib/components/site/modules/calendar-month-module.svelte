<script lang="ts">
	import { selectedDaysStore, selectedDestination } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/month-fare.svelte';
	import { parseDate } from '$lib/public/utils';

	export let section: string;
	export let months: App.LowestFareByMonthAndDestination;
	export let calendar: App.FaresByDateOfDestination;
	export let module: Directus.FareModule;

	const mapMonths = (destination: string, days: number) => (name: string) => ({
		monthYear: name,
		fare: months[destination][days][name],
		count: Object.keys(calendar[destination][days][name]).length
	});

	$: sectionDays = $selectedDaysStore[section];

	$: destination = $selectedDestination?.iata_code;

	$: fareCards =
		destination && sectionDays
			? Object.keys(months[destination][sectionDays])
					.map(mapMonths(destination, sectionDays))
					.sort(
						(a, b) =>
							parseDate(a.fare.departure).getMilliseconds() -
							parseDate(b.fare.departure).getMilliseconds()
					)
			: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

<ul>
	{#each fareCards as card}
		{@const { count, fare, monthYear } = card}
		<li>
			<FareCard {fare} {count} {monthYear} {labels} store="calendar"></FareCard>
		</li>
	{:else}
		<li>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['instructions']}
			</Heading>
		</li>
	{/each}
</ul>
