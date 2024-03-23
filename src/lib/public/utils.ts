export const contentIsResponse = (content: unknown): content is Response => content != null && typeof content === 'object' && 'response' in content

export const contentIsError = (content: unknown): content is Error => content != null && typeof content === 'object' && 'cause' in content

export const contentIsPage = (content: unknown): content is Directus.Site => content != null && typeof content === 'object' && 'favIcon' in content

export const getTitleTagFromPage = (site: Directus.Site) => site.pages[0]?.translations[0]?.title_tag || 'No se econtró el titulo'

export const getMetaDescriptionFromPage = (site: Directus.Site) => site.pages[0]?.translations[0]?.meta_description || 'No se econtró la descripcion'

export const getSectionsFromSite = (site: Directus.Site) => site.pages[0]?.storefronts[0]?.sections || []

export const itemIsTermsAndConditions = (item: Directus.MFAItem, sectionContent: Directus.PageSectionContent): item is Directus.TermsAndConditions => 
  sectionContent.collection === 'terms_and_conditions' && item != null