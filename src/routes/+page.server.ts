import { CMS_HOST, CMS_TOKEN } from '$env/static/private';
import { COLLECTIONS_SITES, DEFAULT_ERROR_MESSAGE, DEFAULT_LANGUAGE, DEFAULT_STOREFRONT, ID_SITE } from '$lib/server/constants';
import { getPage } from '$lib/server/contentProcesing';
import { getPageQuery, type PageQueryBuilderFunctionParams } from '$lib/server/page-request';
import { error, isHttpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isDirectusError } from '@directus/errors';
import { contentIsPage } from '$lib/public/utils';

const pageSetting: PageQueryBuilderFunctionParams = {
  id: 9,
  defaultLang: DEFAULT_LANGUAGE,
  defaultStorefront: DEFAULT_STOREFRONT
}

const errorMessage = { message: DEFAULT_ERROR_MESSAGE }

export const load: PageServerLoad = async () => {

  try {
    const content = await getPage(CMS_HOST, CMS_TOKEN, COLLECTIONS_SITES, ID_SITE, getPageQuery(pageSetting)).catch((err) => {
      console.log('Location: terminos-y-condiciones fetch -', err)
      error(404, errorMessage)
    })

    if (isDirectusError(content) || isHttpError(content) || !contentIsPage(content))
      error(404, errorMessage)

    return {
      content
    };

  } catch (err) {
    console.log('Location: terminos-y-condiciones catch -', err)
    error(404, errorMessage)
  }
};