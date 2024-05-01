<script>
	import { range } from 'ramda';
	import DaySkeleton from './day-skeleton.svelte';
	import { SkeliBar } from '$lib/components/skeleton';

	export let pulse = false;
	const daysOfWeek = range(1, 8);
	const days = range(1, 36);
</script>

<div
	class="bg-backgound-paper calendar:gap-8 calendar:grid-cols-[repeat(7,_minmax(0,_1fr))] grid grid-cols-1 my-16 px-8 py-8 rounded-lg shadow-medium"
>
	{#each daysOfWeek as dow}
		<div class="flex justify-center">
			<SkeliBar width="3ch" {pulse}></SkeliBar>
		</div>
	{/each}
	{#each days as day}
		<DaySkeleton {pulse}></DaySkeleton>
	{/each}
</div>
