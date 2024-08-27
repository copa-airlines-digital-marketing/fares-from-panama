import { CMS_HOST, CMS_TOKEN } from "$env/static/private"
import { isViajaPanamaFareDaysArray } from "$lib/public/utils/fares"
import { getDaysOfFare } from "$lib/server/directus/fares"
import { json } from "@sveltejs/kit"

export const GET = async() => {
  const errorID = crypto.randomUUID()
  try {
    const request = await getDaysOfFare(CMS_HOST, CMS_TOKEN)

    if (isViajaPanamaFareDaysArray(request))
      return json(request, {status: 200})

    console.log('Response is not valid Days response',errorID, JSON.stringify(request))
    return json([], { status: 200 })

  } catch(e) {
    console.log('Error while retreiving Days response', errorID, JSON.stringify(e))
    return json([], { status: 200 })
  }
}