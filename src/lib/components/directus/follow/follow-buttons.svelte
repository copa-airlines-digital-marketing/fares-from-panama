<script lang="ts">
	import Link from '../link/link.svelte';

	export let followButtons: Directus.FollowButtons;

	const networks = followButtons.translations[0].social_network;
</script>

<div class="flex gap-16 text-grey-0 items-center">
	<p class="text-14/20 caret-transparent">{followButtons.translations[0].title}</p>
	<ul class="flex gap-8">
		{#each networks as network}
			{@const link = network.links_url}
			<li class="h-24 flex justify-center hover:animate-bounce">
				<Link {link} showicon={true} showtitle={false}></Link>
			</li>
		{/each}
	</ul>
</div>
