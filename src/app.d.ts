// See https://kit.svelte.dev/docs/types#app

import type { Query, QueryItem } from "@directus/sdk"

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

  namespace Directus {
    type ContentQuery = {
      a: string
    }
    
    type FaresQuery = {
      a: string
    }
    
    type Content = {
      a: string
    }
    
    type Fares = {
      a: string
    }
    
    type Params<Schema, Item> = {
      host: string,
      token: string,
      collection: string,
      id?: string,
      items?: Query<Schema, Item>
      item?: QueryItem<Schema, Item>
    }
  }
}


export {};
