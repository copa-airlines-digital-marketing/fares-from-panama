import { CMS_HOST, CMS_TOKEN } from "$env/static/private";
import { faresReturnSchema } from "$lib/public/utils/fares";
import { getCalendarFares } from "$lib/server/directus/fares";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async({url}) => {
  const {searchParams} = url 

  try {

    const destination = searchParams.get('destination')

    if(!destination)
      return json([], { status: 400 })

    const calendarDestinationRequest = await getCalendarFares(CMS_HOST, CMS_TOKEN, destination)
    
    if(!faresReturnSchema.array().safeParse(calendarDestinationRequest).success)
      return json([], { status: 400 })

    return json(calendarDestinationRequest, { status: 200 })

  } catch(e) {
    const errorID = crypto.randomUUID()

    console.log(errorID, JSON.stringify(e))

    return json([], {status: 204})
  }

}