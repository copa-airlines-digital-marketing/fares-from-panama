<script lang="ts">
	import { Tabs } from 'bits-ui';

	export let slides: Directus.CarrouselSlide[];
</script>

<Tabs.Root>
	<Tabs.List>
		{#each slides as { title }}
			<Tabs.Trigger value={title}>
				{title}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each slides as { title, description, imageID }}
		<Tabs.Content value={title}>
			<div>
				{@html description}
			</div>
		</Tabs.Content>
	{/each}
</Tabs.Root>
