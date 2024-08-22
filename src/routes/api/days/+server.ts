import { CMS_HOST, CMS_TOKEN } from "$env/static/private"
import { isViajaPanamaFareDaysArray } from "$lib/public/utils/fares"
import { getDaysOfFare } from "$lib/server/directus/fares"
import { error, json } from "@sveltejs/kit"

export const GET = async() => {
  try {
    const request = await getDaysOfFare(CMS_HOST, CMS_TOKEN)

    if (isViajaPanamaFareDaysArray(request))
      return json(request.map(value => value.days), {status: 200})

    return error(500, {message: 'Nuestros página se encuentra en mantenimiento, mientras tanto, puedes buscar tu próximo vuelo en copa.com o volver más tarde.'})

  } catch(e) {
    const errorID = crypto.randomUUID()

    console.log(errorID, JSON.stringify(e))

    return error(500, {message: 'Nuestros página se encuentra en mantenimiento, mientras tanto, puedes buscar tu próximo vuelo en copa.com o volver más tarde.'})
  }
}