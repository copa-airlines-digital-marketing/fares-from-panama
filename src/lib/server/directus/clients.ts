import { createDirectus, rest, staticToken, type DirectusClient, type RestClient, type StaticTokenClient } from "@directus/sdk";
import { curry } from "ramda";

export type CMMarketingDirectusClient = DirectusClient<CMMarketingDirectusSchema> & StaticTokenClient<CMMarketingDirectusSchema> & RestClient<CMMarketingDirectusSchema>

export const createRestClient = curry((host: string, token: string): CMMarketingDirectusClient => 
  createDirectus<CMMarketingDirectusSchema>(host).with(staticToken(token)).with(rest()))