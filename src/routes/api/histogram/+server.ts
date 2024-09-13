import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { faresReturnSchema } from "$lib/public/utils/fares";
import { getHistogramFares } from "$lib/server/directus/fares";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async({url}) => {
  const {searchParams} = url 

  try {

    const days = Number(searchParams.get('days'))
    const departure = searchParams.get('departure')

    if(!departure || isNaN(days))
      return json([], { status: 400 })

    const response = await getHistogramFares(CMS_HOST, CMS_TOKEN, days, departure)

    faresReturnSchema.array().parse(response)

    return json(response, { status: 200 })

  } catch(e) {
    const errorID = crypto.randomUUID()

    console.log(errorID, JSON.stringify(e))

    return json([], { status: 200 })
  }

}