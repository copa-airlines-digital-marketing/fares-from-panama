import { CMS_HOST, CMS_TOKEN } from '$env/static/private';
import { COLLECTIONS_PAGES, COLLECTION_DESTINATIONS, DEFAULT_ERROR_MESSAGE, DEFAULT_LANGUAGE, DEFAULT_STOREFRONT } from '$lib/server/constants';
import { getDestinations, getPage } from '$lib/server/contentProcesing';
import { getPageQuery, type PageQueryBuilderFunctionParams } from '$lib/server/page-request';
import { error, isHttpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isDirectusError } from '@directus/errors';
import { contentIsPage, valueIsDestinations } from '$lib/public/utils';
import { getDestinationsQuery } from '$lib/server/destinations-request';

const pageSetting: PageQueryBuilderFunctionParams = {
  id: 9,
  defaultLang: DEFAULT_LANGUAGE,
  defaultStorefront: DEFAULT_STOREFRONT
}

const errorMessage = { message: DEFAULT_ERROR_MESSAGE }

export const load: PageServerLoad = async () => {

  try {

    const requests = await Promise.all([
      getPage(CMS_HOST, CMS_TOKEN, COLLECTIONS_PAGES, pageSetting.id, getPageQuery(pageSetting)).catch((err) => {
        console.log('Location: Home fetch content -', err)
        error(404, errorMessage)
      }),
      getDestinations(CMS_HOST, CMS_TOKEN, COLLECTION_DESTINATIONS, getDestinationsQuery(pageSetting)).catch((err) => {
        console.log('Location: Home fetch destinations -', err)
      })
    ])

    const [content, destinations] = requests
    
    if (isDirectusError(content) || isHttpError(content) || !contentIsPage(content) || isDirectusError(destinations) || isHttpError(destinations) || !valueIsDestinations(destinations))
      error(404, errorMessage)

    return {
      content,
      destinations
    };

  } catch (err) {
    console.log('Location: Home  catch -', err)
    error(404, errorMessage)
  }
};