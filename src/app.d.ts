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
    // Directus types

    type TermsAndConditionsTranslations = {
      title: string
      termAndConditions: string
      path: string
    }

    type TermsAndConditions = {
      id: string
      name: string
      status: string
      translations: TermsAndConditionsTranslations[]
    }

    type TextContentCallToAction = {
      text: string
      link: string
      open_in: string
    }

    type TextContentTranslation = {
      description: string
      embed_media: string
      languages_code: string
      media: string //id of the asset
      title: string
      call_to_actions: TextContentCallToAction[]
    }

    type TextContent = {
      icon: string
      icon_from_library: array[]
      translations: TextContentTranslation[]
    }

    // Applies for icons and logos
    type SVGAsset = {
      image: string //id of the asset
      code: string //svg tag of the icon
    }

    type NavigationLinks = {
      title: string
      link: string
      icon_id: string
      open_in: string
    }

    type NavigationTranslations = {
      languages_code: string
      title: string
      links: NavigationLinks[]
    }

    type Navigation = {
      icon: string,
      translations: NavigationTranslations[]
    }

    type InputOpions = {
      value: string
      labele: string
    }

    type FormInput = {
      name: string
      label: string
      placeholder: string
      type: string
      value: string
      required: boolean
      checked: boolean
      options: InputOpions[]
      options_api: string
      max: number
      min: number
      step: number
    }

    type Form = {
      action: string
      method: string
      name: string
      inputs: FormInput[]
    }

    type CarrouselSlide = {
      title: string
      description: string //HTML code
      imageID: string //id of the asset
      imageDescription: string
      clickTrhoughURL: string
    }

    type Carrousel = {
      name: string
      autoSlide: boolean
      autoSlideDelayMS: number
      slides: string
    }

    type MFAItem = Carrousel | Navigation | TextContent | SVGAsset | Form | TermsAndConditions

    type ContentCollectionNames = 'carrousel' | 'form' | 'icons' | 'logos' | 'navigation' | 'terms_and_conditions' | 'Text_Content'

    type PageSectionContent = {
      "item:Text_Content": TextContent[]
      "item:navigation": Navigation[]
      "item:terms_and_conditions": TermsAndConditions[]
      collection: ContentCollectionNames
      item: MFAItem
    }

    type SectionLandmark = 'aside' | 'footer' | 'header' | 'regular' | 'section'

    type Section = {
      section_id: string
      section_content: PageSectionContent[]
      landmark: SectionLandmark
    }

    type PageStorefrontsSections = {
      id: number
      sections_id: Section
    }

    type PageStorefront = {
      storefronts_code: string
      sections: PageStorefrontsSections[]
    }

    type PageTranslation = {
      languages_code: string
      meta_description: string
      title_tag: string
    }

    type Page = {
      id: number
      name: string
      share_image: string //id of the asset library
      storefronts: PageStorefront[]
      translations: PageTranslation[]
    }

    type Site = {
      favIcon: SVGAsset[] //id of the asset library
      pages: Page[]
    }

    type Schema = {
      sites: Site[]
      pages: Page[]
      translations: PageTranslation[] | TextContentTranslation[] | NavigationTranslations[]
      storefronts: PageStorefront[]
      sections_id: PageStorefrontsSections[]
      sections: Section[]
      section_content: PageSectionContent[]
      item: MFAItem
      Text_Content: TextContent[]
      logos: SVGAsset[]
      icon: SVGAsset[]
      form: Form[]
      navigation: Navigation[]
      carrousel: Carrousel[]
      favIcon: SVGAsset[]
      terms_and_conditions: TermsAndConditions[]
      "item:terms_and_conditions": TermsAndConditions[]
      "item:Text_Content": TextContent[]
      "item:navigation": Navigation[]
    }
    
    type FaresQuery = {
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