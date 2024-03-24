export const contentIsResponse = (content: unknown): content is Response => content != null && typeof content === 'object' && 'response' in content

export const contentIsError = (content: unknown): content is Error => content != null && typeof content === 'object' && 'cause' in content

export const contentIsPage = (content: unknown): content is Directus.Page => content != null && typeof content === 'object' && 'share_image' in content

export const getTitleTagFromPage = (page: Directus.Page) => page.translations[0]?.title_tag || 'No se econtró el titulo'

export const getMetaDescriptionFromPage = (page: Directus.Page) => page.translations[0]?.meta_description || 'No se econtró la descripcion'

export const getSectionsFromPage = (page: Directus.Page) => page.storefronts[0]?.sections || []

export const itemIsTermsAndConditions = (item: Directus.MFAItem, sectionContent: Directus.PageSectionContent): item is Directus.TermsAndConditions => 
  sectionContent.collection === 'terms_and_conditions' && item != null