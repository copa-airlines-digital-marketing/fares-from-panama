<script lang="ts">
	import { SkeliBar } from '$lib/components/skeleton';

	export let pulse = false;
</script>

<div
	class="aspect-square bg-grey-100 calendar:aspect-square calendar:px-8 calendar:py-4 flex flex-col h-full px-16 py-8 rounded-lg w-full"
>
	<SkeliBar {pulse} width="1ch"></SkeliBar>
	<SkeliBar {pulse} width="10ch"></SkeliBar>
	<div class="grow flex flex-col justify-end">
		<SkeliBar {pulse} width="10ch"></SkeliBar>
		<SkeliBar {pulse} width="5ch"></SkeliBar>
	</div>
</div>
