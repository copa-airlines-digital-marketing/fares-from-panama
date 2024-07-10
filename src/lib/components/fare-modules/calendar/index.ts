import { isBeforeSweetSpot } from '$lib/public/utils';
import type { DestinationReturnSchema } from '$lib/public/utils/destinations';
import { isEmpty, min } from 'ramda';

type ToastFN = undefined | ((index?: number) => void)

const getAlternatives = ( calendarMonths: App.LowestFareByMonthAndDestination, iata: string ) => 
  Object.keys(calendarMonths[iata]).filter((day) => 
   Object.values(calendarMonths[iata][parseInt(day)]).some(fare => fare.price < 9999999)
  )

export { default as CalendarModule } from './calendar.svelte'

export const getLowestFareOfMonths = (months: Record<string, ViajaPanamaFare>) => !isEmpty(months) && months !== null
  ? Object.values(months)
      .map((f) => f.price)
      .reduce(min, Infinity)
  : Infinity;

export const checkCloseDates = (date: Date, fare: unknown, month: string, showToastFn: ToastFN, alertsShown: number, maxAlerts: number) => () => {
  if (window.dataLayer)
    window.dataLayer.push({ event: 'fare_click', module: 'Calendar Month', month, fare });
  if (!!showToastFn && isBeforeSweetSpot(date) && alertsShown <= maxAlerts) {
    showToastFn();
    alertsShown += 1;
  }
};

export const checkAttractiveFaresExistanceForItinerary = (destination: DestinationReturnSchema | undefined, days: string | undefined, calendarMonths: App.LowestFareByMonthAndDestination) => {
  if (!destination || !days) return null;

  const { iata_code } = destination;

  const stay = parseInt(days);

  const months = calendarMonths[iata_code][stay];

  const lowest = getLowestFareOfMonths(months)
  
  //return if is normal
  if (![Infinity, 9999999].includes(lowest)) return null;

  return getAlternatives(calendarMonths, iata_code)

};