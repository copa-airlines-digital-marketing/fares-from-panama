<script lang="ts">
	import StatusWrapper from '../site/status-wrapper.svelte';
	import { isAnyEmpty } from '$lib/public/utils/is-any-empty';
	import {
		destinationsStore,
		modulesStore,
		selectedCalendarMonthStore,
		selectedDaysStore,
		selectedDestination
	} from '$lib/public/store';
	import { isAnyTrue } from '$lib/public/utils/is-any-true';

	$: pulse = isAnyEmpty($destinationsStore, $modulesStore);

	$: monthSkeleton = isAnyEmpty($selectedDestination, $selectedDaysStore);

	$: calendarSkeleton = isAnyEmpty(
		$selectedDestination,
		$selectedDaysStore,
		$selectedCalendarMonthStore
	);
</script>

<!-- Status -->
{#if isAnyTrue([pulse, monthSkeleton, calendarSkeleton])}
	<StatusWrapper></StatusWrapper>
{/if}
<!-- Months -->
<!-- Calendar -->
