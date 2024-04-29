<script lang="ts">
	import Bar from '../skeleton/bar.svelte';

	export let pulse = false;
</script>

<div
	class="bg-grey-100 calendar:aspect-square calendar:px-8 calendar:py-4 flex flex-col h-full px-16 py-8 w-full"
>
	<Bar {pulse} width="1ch"></Bar>
	<Bar {pulse} width="10ch"></Bar>
	<Bar {pulse} width="10ch"></Bar>
	<Bar {pulse} width="5ch"></Bar>
</div>
