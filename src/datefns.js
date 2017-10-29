import {
  getTime,
  differenceInMilliseconds as differenceInMillisecondsFoo,
  isBefore as isBeforeFoo,
  isAfter as isAfterFoo,
  addDays as addDaysFoo,
  format as formatFoo,
  distanceInWordsToNow as distanceInWordsToNowFoo
} from 'date-fns'
import i18n from 'src/i18n'

const locales = {
  en: require('date-fns/locale/en'),
  de: require('date-fns/locale/de')
}

const options = () => {
  return { locale: locales[i18n.locale] }
}

export const format = (...args) => {
  return formatFoo(...args, options())
}

export const distanceInWordsToNow = (...args) => {
  return distanceInWordsToNowFoo(...args, options())
}

export const differenceInMilliseconds = (...args) => {
  return differenceInMillisecondsFoo(...args, options())
}

export const isBefore = (...args) => {
  return isBeforeFoo(...args, options())
}

export const isAfter = (...args) => {
  return isAfterFoo(...args, options())
}

export const addDays = (...args) => {
  return addDaysFoo(...args, options())
}

export { getTime }
/*
function foo (...args) {
  sometingelse(...args, 4)

  args.push(5)
  sometjignelse(...args)

  somethinelse (...[...args, 34])

  otherArgs = [...args]
  otherArgdrsef.push(434)
  oijsaefoij(...args)
}

foo('a')
foo('a', 'b', 231, 23, 3) */
