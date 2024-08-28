import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { minPriceByMonthSchema } from "$lib/public/modules/histogram-fares";
import { getLowestFareByDayAndDate } from "$lib/server/directus/fares";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async() => {
  try {
    const minPriceByMonthRequest = await getLowestFareByDayAndDate(CMS_HOST, CMS_TOKEN)
    
    minPriceByMonthSchema.array().parse(minPriceByMonthRequest)

    return json(minPriceByMonthRequest, { status: 200 })

  } catch(e) {
    const errorID = crypto.randomUUID()

    console.log(errorID, JSON.stringify(e))

    return json([], {status: 200 })
  }

}