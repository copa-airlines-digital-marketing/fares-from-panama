<script>
	import { range } from 'ramda';
	import MonthSkeleton from './month-skeleton.svelte';

	export let pulse = false;

	const months = range(1, 7);
</script>

<div class="flex flex-col calendar:flex-row gap-8 my-16">
	{#each months as month}
		<MonthSkeleton {pulse}></MonthSkeleton>
	{/each}
</div>
