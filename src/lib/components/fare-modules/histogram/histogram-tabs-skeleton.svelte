<script>
	import { SkeliBar } from '$lib/components/skeleton';
	import { range } from 'ramda';

	export let pulse = false;
</script>

<div class="flex flex-col calendar:flex-row gap-8 my-16">
	{#each range(0, 6) as month}
		<div class="bg-backgound-paper flex flex-col h-56 calendar:h-116 p-8 rounded-lg w-full">
			<SkeliBar {pulse} width="15ch"></SkeliBar>
			<div class="grow hidden calendar:block">
				<SkeliBar {pulse} width="7ch"></SkeliBar>
			</div>
			<SkeliBar {pulse} width="5ch" class="self-end"></SkeliBar>
		</div>
	{/each}
</div>

<div class="auto-cols-1fr gap-8 grid grid-flow-col my-petit">
	{#each range(0, 30) as item}
		<div class="flex flex-col gap-4 items-center">
			<SkeliBar {pulse} width="3ch" class="h-80"></SkeliBar>
			<SkeliBar {pulse} width="2ch"></SkeliBar>
			<SkeliBar {pulse} width="3ch"></SkeliBar>
		</div>
	{/each}
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
