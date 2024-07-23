<script>
	import Heading from '../copa/typography/heading.svelte';
	import Icon from '../site/icon.svelte';
	import tarifasFelicesLogo from '$lib/assets/tarifas-viaja-panama-logo-white.svg?raw';
	import copaIsotipo from '$lib/assets/logo-copa-airlines-isotipo.svg?raw';
	import copaLogo from '$lib/assets/logo-copa-airlines.svg?raw';
</script>

<div class="fixed inset-0 bg-primary grid place-items-center">
	<div>
		<div class="flex gap-16 mb-24 items-center">
			<Icon data={tarifasFelicesLogo} class="h-56 lg:h-72" />
			<Icon data={copaIsotipo} class="h-40 sm:hidden" />
			<Icon data={copaLogo} class="h-40 hidden sm:block" />
		</div>
		<Heading type="display-normal" style="text-common-white text-center">¡Esperalo pronto!</Heading>
	</div>
</div>
