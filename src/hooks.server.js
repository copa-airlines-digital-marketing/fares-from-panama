/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, status, message }) {
	const msg = status === 404 ? 'La página que estas buscando no existe' : message;

	console.log('Location: Hooks -', message, error);
  
	return {
		message: msg
	};
}
