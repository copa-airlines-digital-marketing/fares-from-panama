<script lang="ts">
	import { Tabs } from 'bits-ui';

	export let slides: Directus.CarrouselSlide[];
</script>

<Tabs.Root class="grid grid-cols-[72px_1fr_4fr_72px] grid-rows-[auto_1fr_auto]">
	<Tabs.List class="col-start-2 flex flex-col row-start-2">
		{#each slides as { title }}
			<Tabs.Trigger class="font-heading p-16 text-h3 lg:text-h3 text-left" value={title}>
				{title}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each slides as { title, description, imageID }}
		<Tabs.Content
			class="col-start-1 col-full grid-cols-subgrid grid-rows-subgrid [&:not([hidden])]:grid row-start-1 row-span-full"
			value={title}
		>
			<div class="col-start-1 h-huge row-start-1"></div>
			<div class="col-start-1 col-full row-start-1 row-span-full"></div>
			<div class="col-start-3 max-w-prose p-24 row-start-2">
				{@html description}
			</div>
			<div class="col-start-1 h-huge row-start-3"></div>
		</Tabs.Content>
	{/each}
</Tabs.Root>
