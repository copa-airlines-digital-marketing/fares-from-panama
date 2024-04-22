import { CMS_HOST, CMS_TOKEN } from '$env/static/private';
import { COLLECTIONS_PAGES, COLLECTION_DESTINATIONS, COLLECTION_FARES, DEFAULT_ERROR_MESSAGE, DEFAULT_LANGUAGE, DEFAULT_STOREFRONT } from '$lib/server/constants';
import { getDestinations, getFares, getPage } from '$lib/server/contentProcesing';
import { getPageQuery, type PageQueryBuilderFunctionParams } from '$lib/server/page-request';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { contentIsPage } from '$lib/public/utils';
import { getDestinationsQuery } from '$lib/server/destinations-request';
import { getFaresQuery } from '$lib/server/fares-request';

const pageSetting: PageQueryBuilderFunctionParams = {
  id: 9,
  defaultLang: DEFAULT_LANGUAGE,
  defaultStorefront: DEFAULT_STOREFRONT
}

const errorMessage = { message: DEFAULT_ERROR_MESSAGE }

export const load: PageServerLoad = async () => {

  try {

    const content = await getPage(CMS_HOST, CMS_TOKEN, COLLECTIONS_PAGES, pageSetting.id, getPageQuery(pageSetting)).catch((err) => {
      console.log('Location: Home fetch content -', err)
      error(404, errorMessage)
    })

    
    console.log

    if (!contentIsPage(content))
      error(404, errorMessage)

    return {
      content/* ,
      lazy: 
        getFares(CMS_HOST, CMS_TOKEN, COLLECTION_FARES, getFaresQuery()) */
    };

  } catch (err) {
    console.log('Location: Home  catch -', err)
    error(404, errorMessage)
  }
};