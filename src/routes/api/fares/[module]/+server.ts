import { json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async({params, url: {searchParams}}) => {

  console.log(params, searchParams)

  return json('ok', {status: 200})
}