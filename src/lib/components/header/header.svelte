<script lang="ts">
	import tarifasFelicesLogo from '$lib/assets/tarifas-viaja-panama-logo-white.svg?raw';
	import copaIsotipo from '$lib/assets/logo-copa-airlines-isotipo.svg?raw';
	import copaLogo from '$lib/assets/logo-copa-airlines.svg?raw';
	import Icon from '$lib/components/site/icon.svelte';

	let className = '';

	export { className as class };
</script>

<header class="bg-primary-ultradark p-16 to-secondary w-full {className}">
	<div class="container grid gap-16 items-center grid-cols-2 mx-auto">
		<a href="/" title="ir al inicio">
			<Icon data={tarifasFelicesLogo} class="h-auto sm:h-56 lg:h-72" />
		</a>
		<a href="https://www.copaair.com" title="Ir a copa.com" class="sm:justify-self-end">
			<Icon data={copaLogo} class="h-auto w-full max-h-40" />
		</a>
	</div>
</header>
