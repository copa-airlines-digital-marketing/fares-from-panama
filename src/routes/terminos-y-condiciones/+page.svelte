<script lang="ts">
	import Header from '$lib/components/header/header.svelte';
	import {
		getMetaDescriptionFromPage,
		getSectionsFromSite,
		getTitleTagFromPage,
		itemIsTermsAndConditions
	} from '$lib/public/utils.js';
	import TermsAndConditions from '$lib/components/directus/terms-and-conditions/terms-and-conditions.svelte';

	export let data;

	const site = data.content;
	const titleTag = getTitleTagFromPage(site);
	const description = getMetaDescriptionFromPage(site);
	const sections = getSectionsFromSite(site);
</script>

<svelte:head>
	<title>{titleTag}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="grid grid-cols-1 auto-rows-min gap-64">
	<Header color="bg-primary"></Header>
	{#each sections as section}
		{@const sectionData = section.sections_id}
		{@const sectionContent = sectionData.section_content[0].item}
		{#if itemIsTermsAndConditions(sectionContent, sectionData.section_content[0])}
			<div class="container mx-auto flex flex-col gap-24">
				<TermsAndConditions terms={sectionContent}></TermsAndConditions>
			</div>
		{/if}
	{/each}
</div>
