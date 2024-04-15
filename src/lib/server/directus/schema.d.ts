type CMMarketingDirectusCollections = 'Pages' | 'Sites'

type CollectionID = string | number 

type BaseCollection = {
  id: CollectionID
  date_created: string
  date_updated: string
  status: string
  user_created: string
  user_updated: string
}

type NoStatusBaseCollection = Omit<BaseCollection, 'status'>

type NoIdBaseCollecttion = Omit<BaseCollection, 'id'>

type UpdateOnlyBaseCollection = Omit<BaseCollection, 'id' | 'status'>

type CodeNameObject = {
  code: string, 
  name: string,
}

type Language = UpdateOnlyBaseCollection & CodeNameObject

type Lang = BaseCollection & CodeNameObject

type Storefront = NoIdBaseCollecttion & CodeNameObject

type Logo = BaseCollection & {
  name: string
  image?: string
  code: string
}

type PageStorefront = {
  id: string
}

type PageTranslation = {
  id: string
  pages_id: Pages
  languages_code: 
  title_tag: string
  meta_description: string
}

type Pages = BaseCollection & {
  site?: string
  storefronts: number[] | PageStorefront[]
  share_image?: string
  translations: number[] | PageTranslation[]
}

type SiteRelation = {
  id: number
  sites_id: number | Site
}

type SiteStorefront = SiteRelation & {
  storefronts_code: number | Storefront
}

type SitePage = SiteRelation & {
  pages_id: number | Page
  page_type: string
}

type SiteLang = SiteRelation & {
  lang_code: number | Lang
}

type Site = BaseCollection & {
  name: string
  primary_domain: string
  favIcon?: number | Logo
  logo?: number | Logo
  supported_languages: number[] | SiteLang[]
  supported_storefronts: number[] | SiteLang[]
  pages: number[] | SitePage[]
}

type CMMarketingDirectusSchema = {
  lang: Lang[]
  languages: Language[]
  logos: Logo[]
  pages: Pages[]
  pages_translations: PageTranslation[]
  pages_storefronts: PageStorefront[]
  sites: Site[]
  sites_lang: SiteLang[]
  sites_storefronts: SiteStorefront[]
  sites_pages: SitePage[]
  storefronts: Storefront[]
}