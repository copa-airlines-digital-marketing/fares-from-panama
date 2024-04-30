import { CMS_HOST, CMS_TOKEN } from '$env/static/private';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_LANGUAGE } from '$lib/server/constants';
import { error } from '@sveltejs/kit';
import { getCollectionUpdatedItem } from '$lib/server/directus/collection-updated';
import { getPageData } from '$lib/server/directus/page';
import { isPage } from '$lib/public/directus/page';

const errorMessage = { message: DEFAULT_ERROR_MESSAGE }

const handlePromiseError = (logMessage: string) => (e: unknown) => {
  console.log(logMessage, e)
  error(404, errorMessage)
}

export const load= async() => {

  try {

    const requests = await Promise.all([
      getPageData(CMS_HOST, CMS_TOKEN, {id: 9, lang: DEFAULT_LANGUAGE}).catch(handlePromiseError('Page home / getPageData /')),
      getCollectionUpdatedItem('viaja_panama_fares', CMS_HOST, CMS_TOKEN).catch(handlePromiseError('Loation Home / request collection update / '))
    ])

    const [content, lastUpdate] = requests

    if (!isPage(content))
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