<script lang="ts">
	export let content: Directus.TextContent;
</script>

<h1
	class="text-display-normal sm:text-display-normal-sm md:text-display-normal-md lg:text-display-normal-lg font-heading font-heading-bold text-common-white my-roomy text-center"
>
	<span
		class=" bg-clip-text text-transparent bg-gradient-to-r from-common-white from-50% md:from-0% to-secondary"
	>
		{content.translations[0]?.title ?? '⚠️ Titulo no definido para: ' + content.name}
	</span>
</h1>
