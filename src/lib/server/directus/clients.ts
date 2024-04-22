import { createDirectus, rest, staticToken, type DirectusClient, type RestClient, type StaticTokenClient } from "@directus/sdk";
import { curry } from "ramda";

export type Client = DirectusClient<Schema> & StaticTokenClient<Schema> & RestClient<Schema>

export const createRestClient = curry((host: string, token: string): Client => 
  createDirectus<Schema>(host).with(staticToken(token)).with(rest()))