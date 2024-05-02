
import { addDays, eachDayOfInterval, endOfMonth, endOfWeek, format, isAfter, isBefore, parse, startOfMonth, startOfWeek } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { es } from 'date-fns/locale'
import type { FlyParams } from "svelte/transition"

export const contentIsResponse = (content: unknown): content is Response => content != null && typeof content === 'object' && 'response' in content

export const contentIsError = (content: unknown): content is Error => content != null && typeof content === 'object' && 'cause' in content

export const contentIsPage = (content: unknown): content is Directus.Page => content != null && typeof content === 'object' && 'share_image' in content

export const valueIsDestinations = (value: unknown): value is Destination[] => value != null && Array.isArray(value) && value.length > 0 && 'iata_code' in value[0]

export const valueIsDestinationOfFare =  (value: unknown): value is {destination: string} => value != null && Array.isArray(value) && value.length > 0 && 'destination' in value[0]

export const valueIsFaresArray = (value: unknown): value is ViajaPanamaFare[] => value != null && Array.isArray(value) && value.length > 0 && 'destination' in value[0]  && 'departure' in value[0] && 'price' in value[0]

export const getTitleTagFromPage = (page: Pages) => page.translations[0]?.title_tag || 'No se econtró el titulo'

export const getMetaDescriptionFromPage = (page: Pages) => page.translations[0]?.meta_description || 'No se econtró la descripcion'

export const getSectionsFromPage = (page: Pages) => page.storefronts[0]?.sections || []

export const itemIsTermsAndConditions = (item: Directus.MFAItem, sectionContent: Directus.PageSectionContent): item is Directus.TermsAndConditions => 
  sectionContent.collection === 'terms_and_conditions' && item != null

export const valueIsDirectusIcon = (value: CollectionID | Icon): value is Icon => value != null && value instanceof Object && 'code' in value

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

export const toPanamaTimeZone = (date: Date) => toZonedTime(date, "America/Panama")

export const parseDeparture = ({departure}: ViajaPanamaFare) => toPanamaTimeZone(parse(departure, 'yyyy-MM-dd', new Date()))

export const parseDate = (dateString: string) => toPanamaTimeZone(parse(dateString, 'yyyy-MM-dd', new Date()))

export const parseMonthYear = (dateString: string) => 
  toPanamaTimeZone(parse(dateString+'01', 'yyyyMMdd', new Date()))

export const getMonthName = (date: Date) => format(date, 'LLLL', {locale: es})

export const getDayOfWeekName = (date: Date) => format(date, 'eee', {locale: es})

export const getDayAndDate = (date: Date) => format(date, 'eeee d', {locale: es})

export const getFullDateName = (date: Date) => format(date, 'EEEE dd LLL', {locale: es})

export const getWeekDaysNames = () => eachDayOfInterval({start: startOfWeek(new Date()), end: endOfWeek(new Date())}).map(getDayOfWeekName)

export const formatDateForDisplay = (date: Date) => format(date, 'dd/MM/yyy')

export const fareDepartureIsBeforeExisting = (fare: ViajaPanamaFare, existing: ViajaPanamaFare) => isBefore(parseDeparture(fare), parseDeparture(existing))

export const farePriceIsLowerThanExisting = (fare: ViajaPanamaFare, existing: ViajaPanamaFare) => parseInt(fare.price) < parseInt(existing.price)

export const farePriceIsEqualToExisting = (fare: ViajaPanamaFare, existing: ViajaPanamaFare) => parseInt(fare.price) === parseInt(existing.price)

const initiateMonth = (fare: ViajaPanamaFare, start: 'week' | 'month' ) => {
  const departureDate = parseDeparture(fare)

  const datesOfMonth = eachDayOfInterval({start: start === 'month' ? startOfMonth(departureDate) : startOfWeek(startOfMonth(departureDate), {weekStartsOn: 1}), end: start === 'month' ? endOfMonth(departureDate) : endOfWeek(endOfMonth(departureDate), {weekStartsOn: 1})})

  return {...datesOfMonth.reduce((accum, current) => ({...accum,[format(current, 'yyyy-MM-dd')]: {}}), {})}
}

export const inititeFareMonth = (fare: ViajaPanamaFare): Record<App.DateString, ViajaPanamaFare> => initiateMonth(fare, 'week')

export const inititeHistogramFareMonthDates = (fare: ViajaPanamaFare): Record<App.DateString, App.BasicFares> => initiateMonth(fare, 'month')

export const inititeHistogramFareMonth = (fare: ViajaPanamaFare): Record<App.DateString, ViajaPanamaFare> => initiateMonth(fare, 'month')

export const getWeekDays = () => {
  const now = toPanamaTimeZone(new Date())
 return  eachDayOfInterval({start: startOfWeek(now, {weekStartsOn: 1}), end: endOfWeek(now, {weekStartsOn: 1})}).map((value) => format(value, 'EEE', {locale: es}))
}

export const isValidToAdd = (fare: ViajaPanamaFare, existing: ViajaPanamaFare) => farePriceIsLowerThanExisting(fare, existing) || farePriceIsEqualToExisting(fare, existing) && fareDepartureIsBeforeExisting(fare,existing)

export const isEmptyObject = (obj: unknown) => obj == null || typeof obj !== 'object' || Object.keys(obj).length === 0

export const getShoppingEngingeURL = (fare: ViajaPanamaFare) => `
https://shopping.copaair.com/?infants=0&origin=TarifasViajaPanama&adults=1&area1=PTY&area2=${fare.destination}&advanced_air_search=false&date2=${fare.return}&flexible_dates_v2=false&date1=${fare.departure}&roundtrip=true&sf=pa&children=0&langid=es
`

const flyOptions: FlyParams[] = [
  { duration:350, x: '-100%'},
  { duration:350, x: '100%'},
  { duration:350, y: '-100%'},
  { duration:350, y: '100%'}
]

export const getFlyingOption = (seed: number) => {
  seed = seed % 10000;

  return flyOptions[Math.floor((seed * 997) % 4)]
}

export const minFare = (min: number, fare: ViajaPanamaFare) => parseInt(fare.price) < min ? parseInt(fare.price) : min 

export const dateIsInMonth = (date: Date, month: Date) => {
  return isAfter(date, addDays(startOfMonth(month),-1)) && isBefore(date, endOfMonth(month))
}

export const isBeforeToday = (date: Date) => isBefore(date, toPanamaTimeZone(new Date()))