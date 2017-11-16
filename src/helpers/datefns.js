import {
  getTime,
  differenceInMilliseconds as differenceInMillisecondsFoo,
  isBefore as isBeforeFoo,
  isAfter as isAfterFoo,
  addDays as addDaysFoo,
  format as formatFoo,
  formatDistanceStrict,
  subYears,
  subMonths,
  subDays,
  subHours,
  setHours as setHoursFoo,
  setMinutes,
  subMinutes
} from 'date-fns'
import { includes } from 'src/helpers/strings'
import i18n from 'src/i18n'
import originalLocale from 'date-fns/locale/en-US'

const locales = {
  en: originalLocale,
  de: require('date-fns/locale/de')
}

const sub = {
  year: subYears,
  month: subMonths,
  day: subDays,
  hour: subHours,
  minute: subMinutes
}
const containsObject = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (typeof list[i] === 'object' && Object.keys(list[i]).length > 0) {
      return i
    }
  }
  return -1
}
const options = () => {
  return { locale: locales[i18n.locale] }
}

const addToObject = (arr, key, opt) => {
  if (key === -1) {
    arr.push(opt)
  }
  else {
    for (let o in opt) {
      console.log('this has not been implemented', o)
      // obj[key][o] = options[o]
    }
  }
  return arr
}

const pushOptions = (arr, key) => {
  return addToObject(arr, key, options())
}

const get2FigText = (obj) => {
  let val = formatDistanceStrict(...obj)
  return ((getNumber(val) !== 0) ? ' ' + i18n.messages[i18n.locale].and + ' ' + val : '')
}
const getNumber = s => { return Number(s.replace(/[^\d.,]+/, '')) }

const subValue = (key, date, output) => {
  let value = getNumber(output)
  return sub[key](date, value)
}

const getFigOutput = (key, obj, fakeoutput) => {
  obj[1] = subValue(key, obj[1], fakeoutput)
  return get2FigText(obj)
}

const get2Fig = (obj) => {
  let foutput = formatDistanceStrict(obj[0], obj[1])
  let output = formatDistanceStrict(...obj)
  if (includes(foutput, 'year')) { output += getFigOutput('year', obj, foutput) }
  if (includes(foutput, 'month')) { output += getFigOutput('month', obj, foutput) }
  if (includes(foutput, 'day')) { output += getFigOutput('day', obj, foutput) }
  if (includes(foutput, 'hour')) { output += getFigOutput('hour', obj, foutput) }
  if (includes(foutput, 'minute')) { output += getFigOutput('minute', obj, foutput) }
  return output
}

export const noTimeDate = (...args) => {
  return setHours(...args, 0)
}

export const setHours = (...args) => {
  return setMinutes(setHoursFoo(...args), 0)
}

export const format = (...args) => {
  return formatFoo(...args, options())
}

export const distanceInWordsToNow = (...args) => {
  args.unshift(new Date())
  return get2Fig(pushOptions(args, containsObject(args)))
}

export const distanceInWords = (...args) => {
  return get2Fig(pushOptions(args, containsObject(args)))
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
