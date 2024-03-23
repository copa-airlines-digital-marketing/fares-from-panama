<script lang="ts">
	import SectionContent from './sectionContent.svelte';

	export let section: Directus.Section;
</script>

{#if section.landmark === 'aside'}
	<aside id={section.section_id}>
		<SectionContent contents={section.section_content}></SectionContent>
	</aside>
{:else if section.landmark === 'footer'}
	<footer id={section.section_id}>
		<SectionContent contents={section.section_content}></SectionContent>
	</footer>
{:else if section.landmark === 'header'}
	<header id={section.section_id}>
		<SectionContent contents={section.section_content}></SectionContent>
	</header>
{:else if section.landmark === 'regular'}
	<div id={section.section_id}>
		<SectionContent contents={section.section_content}></SectionContent>
	</div>
{:else if section.landmark === 'section'}
	<section id={section.section_id}>
		<SectionContent contents={section.section_content}></SectionContent>
	</section>
{:else}
	<div>Insupported section landmark</div>
{/if}
