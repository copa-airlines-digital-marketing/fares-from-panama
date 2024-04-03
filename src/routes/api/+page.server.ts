import { DEFAULT_ERROR_MESSAGE} from '$lib/server/constants';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const errorMessage = { message: DEFAULT_ERROR_MESSAGE }

export const load: PageServerLoad = async () => {
    error(404, errorMessage)
};