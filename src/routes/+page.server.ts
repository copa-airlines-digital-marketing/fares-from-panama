import { CMS_CONTENT_COLLECTION, CMS_CONTENT_ID, CMS_HOST, CMS_TOKEN } from '$env/static/private';
import contentProcesing from '$lib/server/contentProcesing';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
  const days = url.searchParams.get('days');
  const month = url.searchParams.get('mont');
  const destination = url.searchParams.get('dest')
  
  const content = contentProcesing(CMS_HOST, CMS_TOKEN, CMS_CONTENT_COLLECTION, CMS_CONTENT_ID)

	return {
    days,
    month,
    destination,
		modules: {
			featured: '',
      promos: '',
      budget: '',
      calendar: '',
      histogram: '',
      interest: '',
		},
	};
};