import { eachDayOfInterval, endOfMonth, endOfWeek, format, isBefore, parse, startOfMonth, startOfWeek } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
import { es } from 'date-fns/locale'

export const contentIsResponse = (content: unknown): content is Response => content != null && typeof content === 'object' && 'response' in content

export const contentIsError = (content: unknown): content is Error => content != null && typeof content === 'object' && 'cause' in content

export const contentIsPage = (content: unknown): content is Directus.Page => content != null && typeof content === 'object' && 'share_image' in content

export const valueIsDestinations = (value: unknown): value is Directus.Destination[] => value != null && Array.isArray(value)  && 'iata_code' in value[0]

export const valueIsFaresArray = (value: unknown): value is Directus.Fare[] => value != null && Array.isArray(value) && value.length > 0 && 'destination' in value[0]  && 'departure' in value[0] && 'price' in value[0]

export const getTitleTagFromPage = (page: Directus.Page) => page.translations[0]?.title_tag || 'No se econtró el titulo'

export const getMetaDescriptionFromPage = (page: Directus.Page) => page.translations[0]?.meta_description || 'No se econtró la descripcion'

export const getSectionsFromPage = (page: Directus.Page) => page.storefronts[0]?.sections || []

export const itemIsTermsAndConditions = (item: Directus.MFAItem, sectionContent: Directus.PageSectionContent): item is Directus.TermsAndConditions => 
  sectionContent.collection === 'terms_and_conditions' && item != null

export const getBackgroundColorMap = (colorName: Directus.ColorName) => {
  const map: Record<Directus.ColorName, string> = {
    'alternative-dark-orange': 'bg-alternative-darkorange',
    'alternative-gold': 'bg-alternative-gold',
    'alternative-light-orange': 'bg-alternative-lightorange',
    'alternative-pardo': 'bg-alternative-pardo',
    'alternative-prefer-member-blue': 'bg-alternative-prefermemberblue',
    'background-light-blue': 'bg-background-lightblue',
    'background-paper': 'bg-background-paper',
    'black': 'bg-common-black',
    'grey-100': 'bg-grey-100',
    'grey-300': 'bg-grey-300',
    'grey-400': 'bg-grey-400',
    'grey-500': 'bg-grey-500',
    'grey-600': 'bg-grey-600',
    'grey-700': 'bg-grey-700',
    'grey-75': 'bg-grey-75',
    'grey-800': 'bg-grey-800',
    'primary': 'bg-gradient-to-l from-primary-ultradark to-primary',
    'primary-dark': 'bg-primary-dark',
    'primary-faded': 'bg-primary-faded',
    'primary-light': 'bg-primary-light',
    'primary-ultradark': 'bg-primary-ultradark',
    'primary-ultralight': 'bg-primary-ultralight',
    'secondary': 'bg-secondary',
    'secondary-faded': 'bg-secondary-faded',
    'status-gold': 'bg-status-gold',
    'status-silver': 'bg-status-silver',
    'system-error': 'bg-system-error',
    'system-error-faded': 'bg-system-error-faded',
    'system-success': 'bg-system-success',
    'system-success-faded': 'bg-system-success-faded',
    'system-warning': 'bg-system-warning',
    'system-warning-faded': 'bg-system-warning-faded',
    'tertiary': 'bg-tertiary',
    'white': 'bg-common-white',
  }

  return map[colorName]
}

export const joinClasses = (...params: string[]) => {
  return params.join(' ')
}

export const getlanguageCodeFilter = (defaultLang: string, lang?: string) => {
  return {
    _filter: {
      languages_code: {
        _eq: lang || defaultLang
      }
    }
  }
}

es

export const parseDeparture = ({departure}: Directus.Fare) => utcToZonedTime(parse(departure, 'yyyy-MM-dd', new Date()), "America/Panama")

export const parseDate = (dateString: string) => utcToZonedTime(parse(dateString, 'yyyy-MM-dd', new Date()), "America/Panama")

export const getMonthName = (date: Date) => format(date, 'LLLL', {locale: es})

export const getDayOfWeekName = (date: Date) => format(date, 'eee', {locale: es})

export const getFullDateName = (date: Date) => format(date, 'EEEE dd LLL', {locale: es})

export const getWeekDaysNames = () => eachDayOfInterval({start: startOfWeek(new Date()), end: endOfWeek(new Date())}).map(getDayOfWeekName)

export const formatDateForDisplay = (date: Date) => format(date, 'dd/MM/yyy')

export const fareDepartureIsBeforeExisting = (fare: Directus.Fare, existing: Directus.Fare) => isBefore(parseDeparture(fare), parseDeparture(existing))

export const farePriceIsLowerThanExisting = (fare: Directus.Fare, existing: Directus.Fare) => parseInt(fare.price) < parseInt(existing.price)

export const farePriceIsEqualToExisting = (fare: Directus.Fare, existing: Directus.Fare) => parseInt(fare.price) === parseInt(existing.price)

const initiateMonth = (fare: Directus.Fare, start: 'week' | 'month' ) => {
  const departureDate = parseDeparture(fare)

  const datesOfMonth = eachDayOfInterval({start: start === 'month' ? startOfMonth(departureDate) : startOfWeek(startOfMonth(departureDate), {weekStartsOn: 1}), end: start === 'month' ? endOfMonth(departureDate) : endOfWeek(endOfMonth(departureDate), {weekStartsOn: 1})})

  return {...datesOfMonth.reduce((accum, current) => ({...accum,[format(current, 'yyyy-MM-dd')]: {}}), {})}
}

export const inititeFareMonth = (fare: Directus.Fare): Record<App.DateString, Directus.Fare> => initiateMonth(fare, 'week')

export const inititeHistogramFareMonthDates = (fare: Directus.Fare): Record<App.DateString, App.BasicFares> => initiateMonth(fare, 'month')

export const inititeHistogramFareMonth = (fare: Directus.Fare): Record<App.DateString, Directus.Fare> => initiateMonth(fare, 'month')

export const isValidToAdd = (fare: Directus.Fare, existing: Directus.Fare) => farePriceIsLowerThanExisting(fare, existing) || farePriceIsEqualToExisting(fare, existing) && fareDepartureIsBeforeExisting(fare,existing)

export const isEmptyObject = (obj: unknown) => obj == null || typeof obj !== 'object' || Object.keys(obj).length === 0

export const getShoppingEngingeURL = (fare: Directus.Fare) => `
https://shopping.copaair.com/?infants=0&origin=TarifasViajaPanama&adults=1&area1=PTY&area2=${fare.destination}&advanced_air_search=false&date2=${fare.return}&flexible_dates_v2=false&date1=${fare.departure}&roundtrip=true&sf=pa&children=0&langid=es
`