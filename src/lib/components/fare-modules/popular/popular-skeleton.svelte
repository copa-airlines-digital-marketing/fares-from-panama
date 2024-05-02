<script lang="ts">
	import { SkeliBar } from '$lib/components/skeleton';
	import { range } from 'ramda';

	export let pulse = false;
</script>

<div
	class="auto-rows-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-tiny"
>
	{#each range(0, 12) as item}
		<div class="bg-grey-100 flex flex-col h-152 py-8 px-16 rounded-lg w-full">
			<SkeliBar {pulse} width="20ch"></SkeliBar>
			<SkeliBar {pulse} width="10ch"></SkeliBar>
			<div class="grow flex flex-col items-end justify-end">
				<SkeliBar {pulse} width="5ch"></SkeliBar>
			</div>
		</div>
	{/each}
</div>
