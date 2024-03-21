<script lang="ts">
	import NotFound from '$lib/assets/404.svg?raw';
	import Header from '$lib/components/header/header.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
</script>

<Header color="bg-primary-main"></Header>
<div class="h-svh grid grid-cols-1 auto-rows-auto place-items-center gap-16 container">
	<div class="h-[50vh] grid content-end">
		<Icon data={NotFound} class="w-152 h-152"></Icon>
	</div>
	<h1 class="text-primary-main text-30-32 font-medium text-center">
		No pudimos encontrar lo que estabas buscando
	</h1>
	<div class="my-24 grid grid-cols-2 grid-rows-1 gap-16 self-end">
		<a
			class="min-w-[73px] max-h-64 py-12 px-16 bg-current border-current outline-current text-primary-main rounded-[40px] flex gap-8 border outline-1 outline-offset-2 justify-center transition-colors hover:text-primary-ultradark active:text-primary-main active:outline focus:text-primary-ultradark focus:outline"
			href="/"
		>
			<span class="text-grey-50"> Volver al inico </span>
		</a>
		<a
			class="min-w-[73px] max-h-64 py-12 px-16 bg-grey-50 border-current outline-current text-primary-main rounded-[40px] flex gap-8 border outline-1 outline-offset-2 justify-center group hover:bg-current active:bg-current focus:bg-current group: hover:text-primary-main active:text-primary-ultradark active:outline focus:text-primary-main focus:outline transition-colors"
			href="https://www.copaair.com"
		>
			<span
				class="text-primary-main group-hover:text-grey-50 group-active:text-grey-50 group-focus:text-grey-50"
			>
				Ir a copa.com
			</span>
		</a>
	</div>
</div>
