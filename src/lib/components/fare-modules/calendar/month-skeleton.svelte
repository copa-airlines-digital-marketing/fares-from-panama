<script lang="ts">
	import { SkeliBar } from '$lib/components/skeleton';

	export let pulse = false;
</script>

<div class="bg-backgound-paper flex flex-col h-56 calendar:h-116 p-8 rounded-lg w-full">
	<SkeliBar {pulse} width="50%"></SkeliBar>
	<div class="grow hidden calendar:block">
		<SkeliBar {pulse} width="50%"></SkeliBar>
	</div>
	<SkeliBar {pulse} width="50%"></SkeliBar>
</div>
