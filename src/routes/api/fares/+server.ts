import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { COLLECTION_FARES } from "$lib/server/constants";
import { getFares } from "$lib/server/contentProcesing";
import { getFaresQuery } from "$lib/server/fares-request";
import { error, json, type RequestHandler } from "@sveltejs/kit";

const sample = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(json({'lastUpdate':''}, {status: 200}));
  }, 300);
});

export const GET: RequestHandler = async({url}) => {
  try {

   /*  const lastUpdate = url.searchParams.get('lastupdate') 

    const severUpdateRequest = await sample

    const serverUpdated = await severUpdateRequest.json()

    if (lastUpdate && serverUpdated && lastUpdate === serverUpdated.lastUpdate)
      return json(true, {status: 200})  */

    const fares = await getFares(CMS_HOST, CMS_TOKEN, COLLECTION_FARES, getFaresQuery())   
    
    return json(fares, {status: 200})
  } catch (e) {
    const errorID = crypto.randomUUID()
    console.log(errorID, e)
    return error(500, `An error ocurred on the sever with id: ${errorID}`)
  }

}