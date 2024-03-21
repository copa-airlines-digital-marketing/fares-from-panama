import { CMS_HOST, CMS_TOKEN } from '$env/static/private';
import { COLLECTIONS_SITES, DEFAULT_LANGUAGE, DEFAULT_STOREFRONT, ID_SITE } from '$lib/server/constants';
import { getPage } from '$lib/server/contentProcesing';
import { getPageQuery, type PageQueryBuilderFunctionParams } from '$lib/server/page-request';
import type { PageServerLoad } from './$types';

const pageSetting: PageQueryBuilderFunctionParams = {
  id: 36,
  defaultLang: DEFAULT_LANGUAGE,
  defaultStorefront: DEFAULT_STOREFRONT
}

export const load: PageServerLoad = async () => {

  const content = await getPage(CMS_HOST, CMS_TOKEN, COLLECTIONS_SITES, ID_SITE, getPageQuery(pageSetting))

	return {
    content
	};
};