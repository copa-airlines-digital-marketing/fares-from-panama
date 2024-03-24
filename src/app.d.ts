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

    type CopyrightTranslations = {
      languages_code: string
      copyright:string
    }

    type Copyrights = {
      name: string
      status: string
      translations: CopyrightTranslations[]
    }

    type Links = {
      url: string,
      name: string,
      opens_in: string,
      icon: SVGAsset
    }

    type FollowLink = {
      links_url: Link
    }

    type FollowButtonsTranslations = {
      languages_code: string
      title: string
      social_network: FollowLink[]
    }

    type FollowButtons = {
      name: string
      status: string
      translations: FollowButtonsTranslations[]
    }

    type MFAItem = Carrousel | Navigation | TextContent | SVGAsset | Form | TermsAndConditions | Copyrights | FollowButtons

    type ContentCollectionNames = 'carrousel' | 'form' | 'icon' | 'logos' | 'navigation' | 'terms_and_conditions' | 'Text_Content' | 'copyrights' | 'follow_buttons'

    type ContentDisplay = '100' | '75' | '50' | '25'

    type VerticalAlignment = 'top' | 'center' | 'bottom' | 'stretch' | 'baseline'

    type HorizontalAlignment = 'left' | 'center' | 'right' | 'stretch'

    type ContentDistribution = 'space_around' | 'space_between' | 'space_evenly'

    type PageSectionContent = {
      "item:Text_Content": TextContent[]
      "item:navigation": Navigation[]
      "item:terms_and_conditions": TermsAndConditions[]
      "item:copyrights": Copyrights[]
      "item:follow_buttons": FollowButtons[]
      collection: ContentCollectionNames
      display: ContentDisplay
      horizontal_alignment: HorizontalAlignment
      item: MFAItem
      vertical_alignment: VerticalAlignment
    }

    type SectionLandmark = 'aside' | 'footer' | 'header' | 'regular' | 'section'

    type HorizontalBehaviour = 'contained' | 'full'

    type ContentSpacing = 'none' | 'minimal' | 'tiny' | 'petit' | 'normal' | 'roomy' | 'spacious' | 'big' | 'huge'

    type Section = {
      content_horizontal_alignment: HorizontalAlignment
      content_horizontal_distribution: HorizontalAlignment | ContentDistribution
      content_vertical_alignment: VerticalAlignment
      content_vertical_distribution: VerticalAlignment | ContentDistribution
      content_spacing: ContentSpacing
      horizontal_behaviour: HorizontalBehaviour
      landmark: SectionLandmark
      section_id: string
      section_content: PageSectionContent[]
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
      copyrights: Copyrights[]
      follow_buttons: FollowButtons[]
      links: Link[]
      links_url: Link[]
      "item:copyrights": Copyrights[]
      "item:terms_and_conditions": TermsAndConditions[]
      "item:Text_Content": TextContent[]
      "item:navigation": Navigation[]
      "item:follow_buttons": FollowButtons[]
    }
    
    type Params<Schema, Item> = {
      host: string,
      token: string,
      collection: string,
      id?: string | number,
      items?: Query<Schema, Item>
      item?: QueryItem<Schema, Item>
    }
  }
}