

export const itemIsCarrousel = (item: Directus.MFAItem): item is Directus.Carrousel => 
  'slides' in item

export const itemIsNavigation = (item: Directus.MFAItem): item is Directus.Navigation => 
  'translations' in item && Array.isArray(item.translations) && item.translations.length > 0 && 'links' in item.translations[0]

export const itemIsTextContent = (item: Directus.MFAItem): item is Directus.TextContent => 
  'translations' in item && Array.isArray(item.translations) && item.translations.length > 0 && 'embed_media' in item.translations[0]

export const itemIsSVG = (item: Directus.MFAItem): item is Directus.SVGAsset => 
  ('image' in item && 'code' in item)

export const itemIsForm = (item: Directus.MFAItem): item is Directus.Form => 
  ('action' in item && 'method' in item)

export const itemIsTermsAndConditions = (item: Directus.MFAItem): item is Directus.TermsAndConditions => 
  'translations' in item && Array.isArray(item.translations) && item.translations.length > 0 && 'termAndConditions' in item.translations[0]

export const itemIsCopyrights = (item: Directus.MFAItem): item is Directus.Copyrights => 
  'translations' in item && Array.isArray(item.translations) && item.translations.length > 0 && 'copyright' in item.translations[0]

export const itemIsFollowButtons = (item: Directus.MFAItem): item is Directus.FollowButtons => 
  'translations' in item && Array.isArray(item.translations) && item.translations.length > 0 && 'social_network' in item.translations[0]

export const itemIsFareModule = (item: Directus.MFAItem): item is Directus.FareModule => 
'translations' in item && Array.isArray(item.translations) && item.translations.length > 0 && 'labels' in item.translations[0]
  
