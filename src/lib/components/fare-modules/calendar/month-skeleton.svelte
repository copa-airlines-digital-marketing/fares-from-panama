<script lang="ts">
	import Bar from '../skeleton/bar.svelte';

	export let pulse = false;
</script>

<div class="border border-common-white flex flex-col h-116 rounded-2xl w-full">
	<Bar {pulse} width="50%"></Bar>
	<div class="grow">
		<Bar {pulse} width="50%"></Bar>
	</div>
	<Bar {pulse} width="50%"></Bar>
</div>
