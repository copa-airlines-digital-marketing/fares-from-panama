import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
  const days = url.searchParams.get('days');
  const month = url.searchParams.get('mont');
  const destination = url.searchParams.get('dest')
  
  

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