<script lang="ts">
	import SectionContent from './sectionContent.svelte';

	export let section: Directus.Section;

	const { horizontal_behaviour, landmark, section_id, section_content, content_spacing } = section;

	const hbClasses =
		horizontal_behaviour === 'contained' ? 'container mx-auto' : 'w-full max-w-full';

	const spacingClassesMap: Record<Directus.ContentSpacing, string> = {
		none: 'py-0',
		minimal: 'py-8',
		tiny: 'py-16',
		petit: 'py-24',
		normal: 'py-32',
		roomy: 'py-32 sm:py-40 md:py-48 lg:py-56',
		spacious: 'py-40 sm:py-48 md:py-56 lg:py-64',
		big: 'py-56 sm:py-64 md:py-72 lg:py-80',
		huge: 'py-72 sm:py-88 md:py-96 lg:py-112'
	};

	const gridSystem =
		'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-min gap-16 md:gap-24';
</script>

{#if landmark === 'aside'}
	<aside id={section_id} class={spacingClassesMap[content_spacing]}>
		<SectionContent contents={section_content}></SectionContent>
	</aside>
{:else if landmark === 'footer'}
	<footer id={section_id} class="bg-primary {spacingClassesMap[content_spacing]}">
		<div class="container mx-auto {gridSystem}">
			<SectionContent contents={section_content}></SectionContent>
		</div>
	</footer>
{:else if landmark === 'header'}
	<header id={section_id}>
		<SectionContent contents={section_content}></SectionContent>
	</header>
{:else if landmark === 'regular'}
	<div id={section_id} class="{hbClasses} {spacingClassesMap[content_spacing]}">
		<SectionContent contents={section_content}></SectionContent>
	</div>
{:else if landmark === 'section'}
	<section id={section_id} class="{hbClasses} {spacingClassesMap[content_spacing]}">
		<SectionContent contents={section_content}></SectionContent>
	</section>
{:else}
	<div>Insupported section landmark</div>
{/if}
