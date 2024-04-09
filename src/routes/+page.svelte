<script lang="ts">
	import Section from '$lib/components/directus/section.svelte';
	import Header from '$lib/components/site/header.svelte';
	import {
		getMetaDescriptionFromPage,
		getSectionsFromPage,
		getTitleTagFromPage
	} from '$lib/public/utils';
	import DestinationAndFares from '$lib/components/site/destinationAndFares.svelte';
	import Interstitial from '$lib/components/site/interstitial.svelte';

	export let data;

	const site = data.content;
	const titleTag = getTitleTagFromPage(site);
	const description = getMetaDescriptionFromPage(site);
	const storefrontSection = getSectionsFromPage(site);
</script>

<svelte:head>
	<title>{titleTag}</title>
	<meta name="description" content={description} />
</svelte:head>

<DestinationAndFares fares={undefined} destinations={undefined}>
	<Header additionalClass="absolute z-10"></Header>
	{#each storefrontSection as sectioM2M}
		{@const section = sectioM2M.sections_id}
		<Section {section}></Section>
	{/each}
</DestinationAndFares>

<!-- {#await data.lazy}
	<Interstitial
		text="Estamos buscando las mejores tarifas para viajar a tú próximo destino..."
		loading
	></Interstitial>
{:then lazy}
	{@const [destinations, fares] = lazy}
	<DestinationAndFares {fares} {destinations}>
		<Header additionalClass="absolute z-10"></Header>
		{#each storefrontSection as sectioM2M}
			{@const section = sectioM2M.sections_id}
			<Section {section}></Section>
		{/each}
	</DestinationAndFares>
{:catch error}
	<Interstitial text="Ocurrió un error al intentar descargar las tarifas: {error.message}" error
	></Interstitial>
{/await}
 -->
