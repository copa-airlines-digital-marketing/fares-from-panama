<script lang="ts">
	import tarifasFelicesLogo from '$lib/assets/tarifas-viaja-panama-logo-white.svg?raw';
	import copaIsotipo from '$lib/assets/logo-copa-airlines-isotipo.svg?raw';
	import copaLogo from '$lib/assets/logo-copa-airlines.svg?raw';
	import Icon from '$lib/components/site/icon.svelte';

	export let additionalClass = '';
</script>

<header
	class="bg-primary-ultradark border-2 border-primary-dark m-4 p-16 rounded-lg w-[calc(100%_-_8px)] {additionalClass}"
>
	<div class="container flex gap-16 items-center justify-between mx-auto">
		<a href="/" title="ir al inicio">
			<Icon data={tarifasFelicesLogo} class="h-56 lg:h-72" />
		</a>
		<a href="https://www.copaair.com" title="Ir a copa.com">
			<Icon data={copaIsotipo} class="h-40 sm:hidden" />
			<Icon data={copaLogo} class="h-40 hidden sm:block" />
		</a>
	</div>
</header>
