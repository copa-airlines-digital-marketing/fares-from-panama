import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { getlanguageCodeFilter } from "$lib/public/utils";
import { COLLECTION_DESTINATIONS, COLLECTION_FARES, DEFAULT_LANGUAGE } from "$lib/server/constants";
import { aggregate, createDirectus, readItems, rest, staticToken, type AggregationOptions, type Query } from "@directus/sdk";
import { error, type RequestHandler } from "@sveltejs/kit";

const destinationQuery: Query<Directus.Schema, Directus.Destination> = {
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

const destinationFromFares: AggregationOptions<Directus.Schema, 'viaja_panama_fares'> = {
  aggregate: {
    
  },
  groupBy: ['destination']
}


export const GET: RequestHandler = async() => {
  try {
    const client = createDirectus<Directus.Schema>(CMS_HOST).with(staticToken(CMS_TOKEN)).with(rest())

    const requests = await Promise.all([
      client.request(readItems(COLLECTION_DESTINATIONS, destinationQuery)),
      client.request(aggregate(COLLECTION_FARES, destinationFromFares))
    ])

    const [destinations, fromFares] = requests

    console.log('destinations', destinations)

    console.log('fromFares', fromFares)

    return new Response('ok')
  } catch(e) {
    const errorID = crypto.randomUUID()
    console.log(errorID, e)
    error(500, `An error ocurred on the sever with id: ${errorID}`)
  }

}