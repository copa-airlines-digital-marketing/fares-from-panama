import { CMS_HOST, CMS_TOKEN } from "$env/static/private"
import { parseDate } from "$lib/public/utils"
import { getFaresByDestinationStayAndMonthYear, getMonthlyFaresByDestinationAndStay } from "$lib/server/directus/fares"
import { error, json, type RequestHandler } from "@sveltejs/kit"
import { getMonth, isDate } from "date-fns"

const modulesRequest = {
  calendarMonths: getMonthlyFaresByDestinationAndStay,
  calendarMonthDates: getFaresByDestinationStayAndMonthYear,
  
}

export const GET: RequestHandler = async({params, url: {searchParams}}) => {

  console.log(params)

/*   const destinationParam = searchParams.get('destination')
  const daysParam = searchParams.get('days')
  const dateParam = searchParams.get('date')

  if (!destinationParam|| !daysParam || !dateParam) 
    return error(400, 'Bad request')

  const date = parseDate(dateParam)
  const days = parseInt(daysParam)

  console.log(getMonth(date))
  
  if (!/^[A-Za-z]{3}$/.test(destinationParam) || isNaN(days) || !isDate(date))
    return error(400, 'Bad request')

  const request = await getMonthlyFaresByDestinationAndStay(CMS_HOST, CMS_TOKEN, destinationParam, days) */

  return json('ok', {status: 200})
}