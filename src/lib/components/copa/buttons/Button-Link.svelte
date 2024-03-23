<script lang="ts">
	type ButtonStyles = 'rounded-solid-primary' | 'rounded-oultine-primary';
	export let link: string;
	export let style: ButtonStyles;

	const styleMap: Map<ButtonStyles, string> = new Map();

	styleMap.set(
		'rounded-solid-primary',
		'bg-current border-current outline-current text-primary hover:text-primary-ultradark active:text-primary focus    :text-primary-ultradark'
	);
	styleMap.set(
		'rounded-oultine-primary',
		'bg-grey-50 border-current outline-current text-primary hover:bg-current active:bg-current focus:bg-current hover:text-primary-main active:text-primary-ultradark focus:text-primary-main'
	);

	const textStylesMap: Map<ButtonStyles, string> = new Map();
	textStylesMap.set('rounded-solid-primary', 'text-grey-0');
	textStylesMap.set(
		'rounded-oultine-primary',
		'text-primary group-hover:text-grey-0 group-active:text-grey-0 group-focus:text-grey-0'
	);
</script>

<a
	class="min-w-[73px] max-h-64 py-12 px-16 rounded-[40px] flex gap-8 border outline-1 outline-offset-2 justify-center group active:outline focus:outline transition-all caret-transparent text-center {styleMap.get(
		style
	)}"
	href={link}
>
	<span class={textStylesMap.get(style)}>
		<slot />
	</span>
</a>
