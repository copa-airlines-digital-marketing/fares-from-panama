<script lang="ts">
	import { SkeliBar } from '$lib/components/skeleton';
	import { range } from 'ramda';

	export let pulse = false;
</script>

<div class="flex justify-end pr-4">
	<SkeliBar width="10ch"></SkeliBar>
</div>
<div
	class="auto-rows-fr gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-tiny"
>
	{#each range(0, 12) as item}
		<div
			class="aspect-video bg-grey-100 sm:aspect-[4/3] flex flex-col h-152 py-8 px-16 rounded-lg w-full"
		>
			<SkeliBar {pulse} width="20ch"></SkeliBar>
			<SkeliBar {pulse} width="10ch"></SkeliBar>
			<div class="grow flex flex-col items-end justify-end">
				<SkeliBar {pulse} width="5ch"></SkeliBar>
			</div>
		</div>
	{/each}
</div>
<div class="flex justify-center my-tiny">
	<SkeliBar width="10ch"></SkeliBar>
</div>
