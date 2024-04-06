<script>
	export let height = '16px';
	export let width = '100%';
	export let pulse = false;
</script>

<div class="flex items-center" style="height: {height};width: {width};">
	<div class="bg-common-white h-12 rounded-full w-full" class:animate-pulse={pulse}></div>
</div>
