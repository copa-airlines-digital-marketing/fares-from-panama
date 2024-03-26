<script lang="ts">
	import Header from '$lib/components/site/header.svelte';
	import {
		getMetaDescriptionFromPage,
		getSectionsFromPage,
		getTitleTagFromPage
	} from '$lib/public/utils.js';
	import Section from '$lib/components/directus/section.svelte';

	export let data;

	const site = data.content;
	const titleTag = getTitleTagFromPage(site);
	const description = getMetaDescriptionFromPage(site);
	const sections = getSectionsFromPage(site);
</script>

<svelte:head>
	<title>{titleTag}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="grid grid-cols-1 auto-rows-min gap-64">
	<Header color="bg-primary"></Header>
	{#each sections as sectionM2M}
		{@const section = sectionM2M.sections_id}
		<Section {section}></Section>
	{/each}
</div>
