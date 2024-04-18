type CMMarketingDirectusCollections = 'Pages' | 'Sites'

type CollectionID = string | number 

type 

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

type Colors = UpdateOnlyBaseCollection & {
  hex: string
  name: string
}

type TextContent = BaseCollection & {
  name: string
  icon: CollectionID | Icon
  translations: CollectionID[] | TextContentTranslations[]
}

type TextContentTranslations = {
  id: CollectionID
  Text_Content_id: CollectionID | TextContent
  languages_code: CollectionID | Language
  title?: string
  description?: string
  media?: string
  embed_media?: string
  call_to_actions?: TextContentCallToAction[]
}

type TextContentCallToAction = {
  text: string
  link: string
  open_in: string
}

type Link = UpdateOnlyBaseCollection & {
  url: string
  name: string
  icon: CollectionID | Icon
}


type NavitationTranslationsLinks = {
  id: number
  navigation_translations_id: CollectionID |  NavigationTranslation
  links_url: CollectionID | Link
  sort: number
  title: string
  opens_in?: string 
  icon_override: CollectionID | Icon
}

type NavigationTranslation = {
  id: number
  navigation_id: CollectionID | Navigation
  languages_code: CollectionID | Language
  title: string
  links: CollectionID[] | Link[]
}

type Navigation = BaseCollection & {
  name: string
  icon: CollectionID | Icon
  translations: CollectionID[] | NavigationTranslation[]
}

type Carrousel = BaseCollection & {
  name: string
  description?: string
  autoSlide: boolean
  autoSlideDelayMS: number
  slides: CarrouselSlide[]
}

type CarrouselSlide = {
  title: string
  description?: string
  imageID?: string
  imageDescription?: string
  clickThroughURL?: string
}

type Form = BaseCollection & {
  action?: string
  method: string
  name: string
  inputs: FormInput[]
  translations: CollectionID[] | FormTranslations[]
} 

type FormTranslations = {
  id: number
  form_id: CollectionID | Form
  languages_code: CollectionID | Language
  inputs: FormInput[]
}

type FormInput = {
  name: string
  label: string
  placehorlder?: string
  type: string
  value?: string
  required?: boolean
  checked?: boolean
  options?: FormInputOptions[]
  options_api?: string
  max?: number
  min?: number
  step?: number
}

type FormInputOptions = {
  value: string
  label: string
}

type Logo = BaseCollection & {
  name: string
  image: string
  code: string
}

type Links = UpdateOnlyBaseCollection & {
  url: string
  name: string
  icon: CollectionID | Icon
}

type Icon = BaseCollection & {
  name: string
  category: string
  image: string
  code: string
}

type TermsAndConditions = BaseCollection & {
  name: string
  translations: CollectionID[] | TermsAndConditionsTranslations[]
}
  
type TermsAndConditionsTranslations = {
  id: number
  terms_and_conditions_id:  CollectionID | TermsAndConditions
  languages_code: CollectionID | Language
  title: string
  termAndConditions: string
  path?: string
}

type FollowButtons = BaseCollection & {
  name: string
  translations: CollectionID[] | FollowButtonsTranslations[]
}

type FollowButtonsTranslations = {
  id: number
  follow_buttons_id: CollectionID | FollowButtons
  languages_code: CollectionID | Language
  title: string
  social_network: CollectionID[] | FollowButtonsTranslationsLinks[]
}

type FollowButtonsTranslationsLinks = {
  id: number
  follow_buttons_translations_id: CollectionID | FollowButtonsTranslations
  languages_code: CollectionID | Language
  links_url: CollectionID | Link
  sort: number
}

type Copyrights = BaseCollection & {
  name: string
  translations: CollectionID[] | CopyrightsTranslations[]
}

type CopyrightsTranslations = {
  id: number
  copyrights_id: CollectionID | Copyrights
  languages_code: CollectionID | Language
  copyright: string
}

type FareModule = BaseCollection & {
  name: string
  translations: CollectionID[] | FareModuleTranslations[]
}

type FareModuleTranslations = {
  id: CollectionID
  fare_module_id: CollectionID | FareModule
  languages_code: CollectionID | Language
  labels: FareModuleLabel[]
}

type FareModuleLabel = {
  name: string
  value: string
}

type SectionContent = {
  id: number
  sections_id: CollectionID | Section
  item: CollectionID | TextContent | Navigation | Carrousel | Form | Logo | Icon | TermsAndConditions | FollowButtons |  Copyrights | FareModule
  collection: 'Text_Content' | 'navigation' | 'carrousel' | 'form' | 'logos' | 'icons' | 'terms_and_conditions' | 'follow_buttons' | 'copyrights' | 'fare_module'
  order: number
  component_name: string
  display: string
  theme: string
  horizontal_alignment: string
  vertical_alignment: string
}

type Section = BaseCollection & {
  name: string
  section_id: string
  landmarki: string
  horizontal_behaviour: string
  content_horizontal_distribution: string
  content_vertical_alignment: string
  content_vertical_distribution: string
  background_color: CollectionID | Colors
  section_content: CollectionID[] | SectionContent[]
  page_storefronts: CollectionID[] | PageStorefrontSection[]
}

type PageStorefrontSection = {
  id: number
  page_storefront_id: CollectionID | PageStorefront
  section_id: CollectionID | Section
  sort: number
}


type PageStorefront = {
  id: string
  pages_id: Pages
  storefronts_code: Storefront
  sections: CollectionID[] | PageStorefrontSection[]
}

type PageTranslation = {
  id: string
  pages_id: Pages
  languages_code: Language
  title_tag: string
  meta_description: string
}

type Pages = BaseCollection & {
  site?: string
  storefronts: CollectionID[] | PageStorefront[]
  share_image?: string
  translations: CollectionID[] | PageTranslation[]
}

type SiteRelation = {
  id: number
  sites_id: CollectionID | Site
}

type SiteStorefront = SiteRelation & {
  storefronts_code: CollectionID | Storefront
}

type SitePage = SiteRelation & {
  pages_id: CollectionID | Page
  page_type: string
}

type SiteLang = SiteRelation & {
  lang_code: CollectionID | Lang
}

type Site = BaseCollection & {
  name: string
  primary_domain: string
  favIcon?: CollectionID | Logo
  logo?: CollectionID | Logo
  supported_languages: CollectionID[] | SiteLang[]
  supported_storefronts: CollectionID[] | SiteLang[]
  pages: CollectionID[] | SitePage[]
}


type CMMarketingDirectusSchema = {
  carrousel: Carrousel[]
  colors: Colors[]
  copyrights: Copyrights[]
  copyrights_translations: CopyrightsTranslations[]
  fare_module: FareModule[]
  fare_module_translations: FareModuleTranslations[]
  follow_buttons: FollowButtons[]
  follow_buttons_translations: FollowButtonsTranslations[]
  follow_buttons_translations_links: FollowButtonsTranslationsLinks[]
  form: Form[]
  form_translations: FormTranslations[]
  icons: Icon[]
  lang: Lang[]
  languages: Language[]
  logos: Logo[]
  navigation: Navigation[]
  navigation_translations: NavigationTranslation[]
  navigation_translations_links: NavitationTranslationsLinks[]
  pages: Pages[]
  pages_translations: PageTranslation[]
  pages_storefronts: PageStorefront[]
  pages_storefronts_sections: PageStorefrontSection[]
  sections: Section[]
  sections_section_content: SectionContent[]
  sites: Site[]
  sites_lang: SiteLang[]
  sites_storefronts: SiteStorefront[]
  sites_pages: SitePage[]
  storefronts: Storefront[]
  terms_and_conditions: TermsAndConditions[]
  terms_and_conditions_translations: TermsAndConditionsTranslations[]
  Text_content: TextContent[]
  Text_content_Translations: TextContentTranslations[]
}