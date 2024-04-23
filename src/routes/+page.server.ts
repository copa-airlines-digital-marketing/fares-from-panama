import { CMS_HOST, CMS_TOKEN } from '$env/static/private';
import { COLLECTIONS_PAGES, DEFAULT_ERROR_MESSAGE, DEFAULT_LANGUAGE, DEFAULT_STOREFRONT } from '$lib/server/constants';
import { getPage } from '$lib/server/contentProcesing';
import { getPageQuery, type PageQueryBuilderFunctionParams } from '$lib/server/page-request';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { contentIsPage } from '$lib/public/utils';
import { getCollectionUpdatedItem } from '$lib/server/directus/collection-updated';

const pageSetting: PageQueryBuilderFunctionParams = {
  id: 9,
  defaultLang: DEFAULT_LANGUAGE,
  defaultStorefront: DEFAULT_STOREFRONT
}

const errorMessage = { message: DEFAULT_ERROR_MESSAGE }

const handlePromiseError = (logMessage: string) => (e: unknown) => {
  console.log(logMessage, e)
  error(404, errorMessage)
}

export const load: PageServerLoad = async () => {

  try {

    const requests = await Promise.all([
      getPage(CMS_HOST, CMS_TOKEN, COLLECTIONS_PAGES, pageSetting.id, getPageQuery(pageSetting)).catch(handlePromiseError('Location: Home fetch content -')),
      getCollectionUpdatedItem('viaja_panama_fares', CMS_HOST, CMS_TOKEN).catch(handlePromiseError('Loation Home / request collection update / '))
    ])

    const [content, lastUpdate] = requests

    if (!contentIsPage(content))
      error(404, errorMessage)

    return {
      content,
      lastUpdate
    };

  } catch (err) {
    console.log('Location: Home  catch -', err)
    error(404, errorMessage)
  }
};