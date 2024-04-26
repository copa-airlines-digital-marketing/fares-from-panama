import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { addDestination, destinationReturnSchema, isDestinationArray, transformDestinations } from "$lib/public/utils/destinations";
import { DEFAULT_LANGUAGE } from "$lib/server/constants";
import { getAllDestinationsInLanguage } from "$lib/server/directus/destinations";
import { getDestinationsOfFares } from "$lib/server/directus/fares";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { fareDestinationReturnSchema, isViajaPanamaFareDestinationArray } from "$lib/public/utils/fares";

export const GET: RequestHandler = async() => {

  try {
    const requests = await Promise.all([
      getAllDestinationsInLanguage(CMS_HOST, CMS_TOKEN, DEFAULT_LANGUAGE),
      getDestinationsOfFares(CMS_HOST, CMS_TOKEN)
    ])

    const [destinations, fromFares] = requests

    if (isDestinationArray(destinations) && isViajaPanamaFareDestinationArray(fromFares))
      return json(fromFares.map(addDestination(transformDestinations(destinations))), {status: 200})

    destinationReturnSchema.array().parse(destinations)

    fareDestinationReturnSchema.array().parse(fromFares)

    return error(500)

  } catch(e) {
    const errorID = crypto.randomUUID()

    console.log(errorID, JSON.stringify(e))

    return error(500)
  }

}