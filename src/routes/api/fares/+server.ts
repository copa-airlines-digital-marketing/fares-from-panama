import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { valueIsFaresArray } from "$lib/public/utils";
import { extractLastUpdated, isCollectionUpdatedArray } from "$lib/public/utils/collection-updated";
import { faresReturnSchema } from "$lib/public/utils/fares";
import { getCollectionUpdatedItem } from "$lib/server/directus/collection-updated";
import { getAllFares } from "$lib/server/directus/fares";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { isEmpty } from "ramda";

export const GET: RequestHandler = async({url}) => {
  try {
    const lastUpdate = url.searchParams.get('lastupdate') 

    const severUpdateRequest = await getCollectionUpdatedItem('viaja_panama_fares', CMS_HOST, CMS_TOKEN)

    if (isCollectionUpdatedArray(severUpdateRequest) && lastUpdate === extractLastUpdated(severUpdateRequest))
      return json(null, {status: 200})

    const allFaresRequest = await getAllFares(CMS_HOST, CMS_TOKEN)

    if (!isEmpty(allFaresRequest) && valueIsFaresArray(allFaresRequest))
      return json(allFaresRequest, {status: 200})

    faresReturnSchema.array().parse(allFaresRequest)

    return json([], {status: 200})

  } catch (e) {
    const errorID = crypto.randomUUID()

    console.log(errorID, JSON.stringify(e))

    return error(500, {message: 'Nuestros página se encuentra en mantenimiento, mientras tanto, puedes buscar tu próximo vuelo en copa.com o volver más tarde.'})
  }

}