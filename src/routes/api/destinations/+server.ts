import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { addDestination, transformDestinations } from "$lib/public/destinations-transform";
import { getlanguageCodeFilter, valueIsDestinationOfFare, valueIsDestinations } from "$lib/public/utils";
import { COLLECTION_DESTINATIONS, COLLECTION_FARES, DEFAULT_LANGUAGE } from "$lib/server/constants";
import { aggregate, createDirectus, readItems, rest, staticToken, type AggregationOptions, type Query } from "@directus/sdk";
import { error, json, type RequestHandler } from "@sveltejs/kit";

const destinationQuery: Query<Schema, Destination> = {
  fields: [
    'iata_code',
    'main_image',
    {translations: ['name']},
    {categories: [
      {destination_category_id:[{translations:['name']}]}
    ]},
    {'country': [
      'code',
      {translations: ['name']}
    ]}
  ],
  deep: {
    translations: getlanguageCodeFilter(DEFAULT_LANGUAGE, 'es'),
    categories: {
      translations: getlanguageCodeFilter(DEFAULT_LANGUAGE, 'es'),
    },
    country: {
      translations: getlanguageCodeFilter(DEFAULT_LANGUAGE, 'es'),
    }
  }
}

const destinationFromFares: AggregationOptions<Schema, 'viaja_panama_fares'> = {
  aggregate: {
    
  },
  groupBy: ['destination']
}

export const GET: RequestHandler = async() => {
  try {
    const client = createDirectus<Schema>(CMS_HOST).with(staticToken(CMS_TOKEN)).with(rest())

    const requests = await Promise.all([
      client.request(readItems(COLLECTION_DESTINATIONS, destinationQuery)),
      client.request(aggregate(COLLECTION_FARES, destinationFromFares))
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