<script lang="ts">
	import Heading from '../copa/typography/heading.svelte';
	import StatusText from './status-text.svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import IconInfo from '$lib/assets/icon-solar-info-circle-bold.svg?raw';
	import IconError from '$lib/assets/icon-error.svg?raw';

	export let name: string;
	export let labels: Record<string, string>;
	export let translations = false;
	export let fares = false;
	export let destination = false;
	export let days = false;
	export let budget = false;
	export let month = false;
	export let dates = false;
	export let interest = false;
	export let theme: Directus.Theme;

	const themeColor = theme === 'light' ? 'text-grey-600' : 'text-common-white';
</script>

{#if translations}
	<StatusText>
		<Icon data={IconError} class="size-24 text-red"></Icon>
		<Heading type="display-tiny" style="{themeColor} text-center ">
			No translations for {name}
		</Heading>
	</StatusText>
{:else if fares}
	<StatusText pulse>
		<Heading type="display-tiny" style="{themeColor} text-center ">
			{labels['loading']}
		</Heading>
	</StatusText>
{:else if destination}
	<StatusText>
		<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
		<Heading type="display-tiny" style="{themeColor} text-center ">
			{labels['selectDestination']}
		</Heading>
	</StatusText>
{:else if days}
	<StatusText>
		<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
		<Heading type="display-tiny" style="{themeColor} text-center ">
			{labels['selectDays']}
		</Heading>
	</StatusText>
{:else if budget}
	<StatusText>
		<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
		<Heading type="display-tiny" style="{themeColor} text-center ">
			{labels['selectBudget']}
		</Heading>
	</StatusText>
{:else if month}
	<StatusText>
		<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
		<Heading type="display-tiny" style="{themeColor} text-center ">
			{labels['selectMonth']}
		</Heading>
	</StatusText>
{:else if interest}
	<StatusText>
		<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
		<Heading type="display-tiny" style="{themeColor} text-center ">
			{labels['selectInterest']}
		</Heading>
	</StatusText>
{:else if dates}
	<StatusText>
		<Icon data={IconInfo} class="size-24 text-secondary"></Icon>
		<Heading type="display-tiny" style="{themeColor} text-center ">
			{labels['selectDate']}
		</Heading>
	</StatusText>
{/if}
