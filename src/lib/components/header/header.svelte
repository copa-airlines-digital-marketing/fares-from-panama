<script lang="ts">
	import tarifasFelicesLogo from '$lib/assets/tarifas-viaja-panama-logo-white.svg?raw';
	import copaIsotipo from '$lib/assets/logo-copa-airlines-isotipo.svg?raw';
	import copaLogo from '$lib/assets/logo-copa-airlines.svg?raw';
	import Icon from '$lib/components/icon/icon.svelte';

	export let color: 'bg-transparent' | 'bg-primary' = 'bg-transparent';
</script>

<header class="p-16 absolute top-0 left-0 w-full {color}">
	<div class="container flex gap-16 items-center justify-between mx-auto">
		<a href="/" title="ir al inicio">
			<Icon data={tarifasFelicesLogo} class="h-56 md:h-72" />
		</a>
		<a href="https://www.copaair.com" title="Ir a copa.com">
			<Icon data={copaIsotipo} class="h-32 sm:hidden" />
			<Icon data={copaLogo} class="h-32 hidden sm:block" />
		</a>
	</div>
</header>
