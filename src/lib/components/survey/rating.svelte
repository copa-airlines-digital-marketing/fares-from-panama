<script>
	import Heading from '../copa/typography/heading.svelte';
	import Check from './check.svelte';

	export let count;
	export let name;

	let scores = Array.from(Array(count).keys()).map((v) => v + 1);
</script>

<Heading type="h4" style="text-grey-700">
	<slot name="heading" />
</Heading>
<div class="grid grid-cols-1 auto-rows-auto">
	<div class="grid grid-rows-1 grid-flow-col auto-cols-fr gap-4 col-start-1">
		{#each scores as score}
			<Check id="radio-{name}-{score}" value={score} {name}>{score}</Check>
		{/each}
	</div>
	<div class="flex justify-between text-grey-600 text-12/16 col-start-1 row-start-2">
		<div class="shrink text-wrap">
			<slot name="lowScore" />
		</div>
		<div class="shrink text-right text-wrap">
			<slot name="highScore" />
		</div>
	</div>
</div>
