import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { addDestination, transformDestinations } from "$lib/public/destinations-transform";
import { valueIsDestinationOfFare, valueIsDestinations } from "$lib/public/utils";
import { DEFAULT_LANGUAGE } from "$lib/server/constants";
import { getAllDestinationsInLanguage } from "$lib/server/directus/destinations";
import { getDestinationsOfFares } from "$lib/server/directus/fares";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async() => {
  try {

    const requests = await Promise.all([
      getAllDestinationsInLanguage(CMS_HOST, CMS_TOKEN, DEFAULT_LANGUAGE),
      getDestinationsOfFares(CMS_HOST, CMS_TOKEN)
    ])

    const [destinations, fromFares] = requests

    if (!valueIsDestinations(destinations))
      return error(500, new Error('Los destinos descargados no cumplen el formato', { cause: destinations }))

    if (!valueIsDestinationOfFare(fromFares))
      return error(500, new Error('La agrupacion por destino de las tarifas descargada no cumplen el formato', { cause: fromFares }))

    const pageDestinations = fromFares.map(addDestination(transformDestinations(destinations)))

    return json(pageDestinations, {status: 200})
  } catch(e) {
    const errorID = crypto.randomUUID()
    console.log(errorID, e)
    error(500, `An error ocurred on the sever with id: ${errorID}`)
  }

}