import { date } from 'quasar'

export const buildOutput = (days, hours, minutes, seconds) => {
  let output = ''
  if (days > 1) {
    output += days + ' ' + this.$t('Time.days') + ' '
  }
  else if (days === 1) {
    output += '1 ' + this.$t('Time.day') + ' '
  }
  if (hours > 1) {
    output += hours + ' ' + this.$t('Time.hours') + ' '
  }
  else if (hours === 1) {
    output += '1 ' + this.$t('Time.hour') + ' '
  }
  if (days < 1) {
    if (minutes > 1) {
      output += minutes + ' ' + this.$t('Time.minutes') + ' '
    }
    else if (minutes === 1) {
      output += '1 ' + this.$t('Time.minute') + ' '
    }
    if (hours < 1) {
      if (seconds > 1) {
        output += seconds + ' ' + this.$t('Time.seconds')
      }
      else if (seconds === 1) {
        output += '1 ' + this.$t('Time.second')
      }
    }
  }
  if (output === '') return -1
  else return output.trim()
}
export const formatTime = (timeStamp) => {
  let today = new Date()
  let diff = date.formatDate(timeStamp, 'X') - date.formatDate(today, 'X')
  if (diff < 0) {
    return -1
  }
  let days = 0
  let hours = 0
  let minutes = 0
  while (diff - 86400 > 0) {
    days = days + 1
    diff = diff - 86400
  }
  while (diff - 3600 > 0) {
    hours = hours + 1
    diff = diff - 3600
  }
  while (diff - 60 > 0) {
    minutes = minutes + 1
    diff = diff - 60
  }
  let seconds = diff
  // let days = date.formatDate(diff, 'D')
  return buildOutput(days, hours, minutes, seconds)
}
