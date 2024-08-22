<script lang="ts">
	import { page } from '$app/stores';
	import NotFound from '$lib/assets/404.svg?raw';
	import ButtonLink from '$lib/components/copa/buttons/Button-Link.svelte';
	import Header from '$lib/components/header/header.svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import Heading from '$lib/components/copa/typography/heading.svelte';
	import { error } from '@sveltejs/kit';
</script>

<Header></Header>
<div
	class="h-svh grid grid-cols-1 grid-rows-[50svh_min-content_1fr_min-content] md:grid-rows-[50svh_min-content_min-content_1fr] justify-items-center gap-16 container mx-auto"
>
{#if $page.error}
	<div class="grid content-end">
		<Icon data={NotFound} class="w-152 h-152"></Icon>
	</div>
{/if}
	<Heading type="display-normal" style="text-primary text-center">
		No pudimos encontrar lo que estabas buscando
	</Heading>
	<Heading type="display-tiny" style="text-grey-600">{$page.error?.message}</Heading>
	<div class="my-24 grid grid-cols-2 grid-rows-1 gap-16 items-start">
		<ButtonLink style="rounded-solid-primary" link="/">Volver al inicio</ButtonLink>
		<ButtonLink style="rounded-oultine-primary" link="https://www.copaair.com">
			Ir a copa.com
		</ButtonLink>
	</div>
</div>
