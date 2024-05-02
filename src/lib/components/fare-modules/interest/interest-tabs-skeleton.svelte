<script>
	import { range } from 'ramda';
	import { SkeliBar, SkeliImage } from '$lib/components/skeleton';

	export let pulse = false;

	const interest = range(0, 10);

	const fares = range(0, 12);
</script>

<div class="flex gap-16">
	<div>
		{#each interest as item}
			<div
				class="bg-backgound-paper flex gap-8 items-center h-88 md:h-116 p-8 rounded-lg w-full mb-8"
			>
				<SkeliImage class="!size-76 rounded-full"></SkeliImage>
				<div class="grow">
					<SkeliBar {pulse} width="10ch"></SkeliBar>
				</div>
				<SkeliBar {pulse} width="5ch"></SkeliBar>
			</div>
		{/each}
	</div>
	<div
		class="auto-rows-min bg-backgound-paper gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-8 w-full"
	>
		{#each fares as item}
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
</div>
