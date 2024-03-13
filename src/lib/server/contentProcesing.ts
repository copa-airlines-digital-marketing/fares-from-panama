import cms from "./cms";


export default async function(host:string, token: string, collection: string, id: string){
  const requestSettings: Directus.Params<Directus.ContentQuery, Directus.Content> = {
    host,
    token,
    collection,
    id,
  }

  const request = await cms(requestSettings)

  console.log(request)
}