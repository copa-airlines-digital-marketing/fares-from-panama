<script>
	import { range } from 'ramda';
	import { SkeliBar, SkeliImage } from '$lib/components/skeleton';

	export let pulse = false;

	const interest = range(0, 10);
</script>

<div class="flex flex-col calendar:flex-row gap-8 my-16">
	{#each interest as item}
		<div class="bg-backgound-paper flex gap-8 items-center h-88 md:h-116 p-8 rounded-lg w-full">
			<SkeliImage class="!size-76 rounded-full"></SkeliImage>
			<div class="grow">
				<SkeliBar {pulse} width="10ch"></SkeliBar>
			</div>
			<SkeliBar {pulse} width="5ch"></SkeliBar>
		</div>
	{/each}
</div>
