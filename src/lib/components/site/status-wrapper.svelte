<script lang="ts">
	import Heading from '../copa/typography/heading.svelte';
	import Skeleton from './status-text.svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import IconInfo from '$lib/assets/icon-solar-info-circle-bold.svg?raw';
	import IconError from '$lib/assets/icon-error.svg?raw';

	export let name: string;
	export let labels: Record<string, string>;
	export let translations = true;
	export let fares = true;
	export let destination = true;
	export let days = true;
	export let budget = true;
	export let month = true;
	export let dates = true;
	export let interest = true;
</script>

<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-3 gap-16 md:gap-24 my-petit">
	{#if !translations}
		<Skeleton>
			<Icon data={IconError} class="text-24/32 text-red"></Icon>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				No translations for {name}
			</Heading>
		</Skeleton>
	{:else if !fares}
		<Skeleton pulse>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['loading']}
			</Heading>
		</Skeleton>
	{:else if !destination}
		<Skeleton>
			<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</Skeleton>
	{:else if !days}
		<Skeleton>
			<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</Skeleton>
	{:else if !budget}
		<Skeleton>
			<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</Skeleton>
	{:else if !month}
		<Skeleton>
			<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</Skeleton>
	{:else if !interest}
		<Skeleton>
			<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</Skeleton>
	{:else if !dates}
		<Skeleton>
			<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</Skeleton>
	{:else}
		<slot />
	{/if}
</ul>
