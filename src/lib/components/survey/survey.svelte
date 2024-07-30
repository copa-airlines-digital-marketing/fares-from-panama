<script lang="ts">
	import { Button, Dialog } from 'bits-ui';
	import IconCross from '$lib/assets/icon-cross.svg?raw';
	import Icon from '../site/icon.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import Heading from '../copa/typography/heading.svelte';
	import Rating from './rating.svelte';
	import { z } from 'zod';
	import { createToaster, melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';

	type ToastData = {
		text: string;
	};

	let animate = false;
	let closeModal: HTMLButtonElement;
	let open: HTMLButtonElement;

	const cookieName = 'tfv_answered_survey';

	const formValidation = z.object({
		ease_of_use: z.string().min(1).max(1),
		attractive: z.string().min(1).max(1),
		destino: z.string().min(1).max(64),
		recommend: z.string().min(1).max(2)
	});

	function setCookie(c_name: string, value: string, exdays: number) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = encodeURI(value) + (exdays == null ? '' : '; expires=' + exdate.toUTCString());
		document.cookie = c_name + '=' + c_value;
	}

	const getCookieValue = (name: string) =>
		document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

	const {
		elements: { content, title, description, close },
		helpers: { addToast },
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	const handleBeforeUnload = (ev: BeforeUnloadEvent) => {
		const hasAnswered = getCookieValue(cookieName);
		if (!hasAnswered) {
			open.click();
			ev.preventDefault();
			return 'Podrias contestar esta encuesta?';
		}
		return false;
	};

	const handleFormSubmit = (ev: SubmitEvent) => {
		ev.preventDefault();
		const target = ev.target;
		if (!target) return;
		const data = new FormData(target as HTMLFormElement);
		if (!formValidation.safeParse(data)) return;
		window.dataLayer.push({
			event: 'submit_survey',
			name: 'tarifas viaja panama soft launch',
			answers: [...data.entries()]
		});
		setCookie(cookieName, 'answered', 30);
		animate = false;
		addToast({
			data: { text: 'Gracias por responder esta encuesta. ¡Agradecemos mucho tus comentarios!' }
		});
		if (closeModal) closeModal.click();
	};

	onMount(() => {
		const hasAnswered = getCookieValue(cookieName);
		if (!hasAnswered) animate = true;
		window.addEventListener('beforeunload', handleBeforeUnload);
	});
</script>

{#if animate}
	<Dialog.Root>
		<Dialog.Trigger asChild let:builder>
			{#if animate}
				<button
					use:builder.action
					in:fly={{ delay: 1000, x: 100, easing: quintOut, duration: 750 }}
					{...builder}
					class="fixed z-50 right-0 top-1/2 -translate-y-1/2 -rotate-90 translate-x-36
      bg-secondary py-8 px-16 text-grey-50 rounded outline-none hover:bg-primary focus:bg-primary transition-colors"
					bind:this={open}
				>
					Feedback
				</button>
			{/if}
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay
				transition={fly}
				transitionConfig={{ duration: 150 }}
				class="fixed inset-0 z-50 bg-common-black/80"
			></Dialog.Overlay>
			<Dialog.Content
				transition={fly}
				transitionConfig={{ y: 100 }}
				class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg border border- bg-backgound-paper py-24 shadow-modal outline-none flex flex-col max-w-[92%] sm:max-w-[392px] w-full max-h-[72vh]"
			>
				<Dialog.Title class="px-24">
					<Heading type="h2" style="text-primary-dark">Feedback</Heading>
					<p class="text-grey-500 max-w-prose mt-8">
						¿Nos regalas 30 segundos para responder esta encuesta de 4 preguntas? Tus respuestas nos
						ayudarán a mejorar. ¡Gracias por tu tiempo!
					</p>
				</Dialog.Title>
				<Dialog.Description class="overflow-y-auto px-24">
					<form on:submit={handleFormSubmit}>
						<ol class="flex flex-col gap-16 my-petit">
							<li>
								<Rating name="ease_of_use" count={5}>
									<span slot="heading">¿Qué tan fácil te pareció de usar?</span>
									<div slot="lowScore">Extremadamente difícil</div>
									<div slot="highScore">Extremadamente fácil</div>
								</Rating>
							</li>
							<li>
								<Rating name="attractive" count={5}>
									<span slot="heading"
										>¿Cuán atractivas te parecieron las tarifas que encontraste?</span
									>
									<div slot="lowScore">Extremadamente malas</div>
									<div slot="highScore">Extremadamente buenas</div>
								</Rating>
							</li>
							<li>
								<Heading type="h4" style="">¿Qué destinos estabas buscando?</Heading>
								<label for="text-destinos" class="sr-only">¿Qué destinos estabas buscando?</label>
								<input
									type="text"
									name="destino"
									id="text-destinos"
									aria-labelledby="destinos-prompt"
									required
									max="64"
									class="border rounded p-12 border-grey-300 my-4 w-full"
								/>
							</li>
							<li>
								<Rating name="recommend" count={11} startAt={0}>
									<span slot="heading">¿Recomendarías esta página a un amigo o familiar?</span>
									<div slot="lowScore">Extremadamente malas</div>
									<div slot="highScore">Extremadamente buenas</div>
								</Rating>
							</li>
						</ol>
						<Button.Root
							type="submit"
							class="py-8 px-16 text-14/20 rounded-full bg-primary hover:bg-primary-light focus:bg-primary-light text-common-white outline-none w-full"
							>Enviar</Button.Root
						>
					</form>
				</Dialog.Description>
				<Dialog.Close asChild let:builder>
					<button
						use:builder.action
						{...builder}
						class="text-primary rounded-full hover:text-primary-light focus:text-primary-light outline-none order-first self-end px-24"
						bind:this={closeModal}
					>
						<Icon data={IconCross} class="size-36" />
						<span class="sr-only">Cerrar</span>
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
{/if}

<div
	use:portal
	class="fixed right-0 top-0 z-50 m-16 flex flex-col items-end gap-8 md:bottom-0 md:top-auto"
>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="rounded bg-system-success text-common-white shadow-medium"
		>
			<div
				class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-16 p-20"
			>
				<div>
					<div use:melt={$description(id)}>
						{data.text}
					</div>
				</div>
				<button
					use:melt={$close(id)}
					class="absolute right-16 top-16 grid size-24 place-items-center rounded-full text-common-white hover:bg-system-success-faded focus:bg-system-success-faded"
				>
					<Icon data={IconCross} class="size-16"></Icon>
					<span class="sr-only">Cerrar notificiación</span>
				</button>
			</div>
		</div>
	{/each}
</div>
