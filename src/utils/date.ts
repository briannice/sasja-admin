import { Timestamp } from 'firebase/firestore'
import moment from 'moment-timezone'

export const dateToString = (date: Date, format: string) => {
  const result = moment(date).tz('Europe/Brussels').format(format)
  return result
}

export const timestampToString = (timestamp: Timestamp, format: string) => {
  const date = timestamp.toDate()
  return dateToString(date, format)
}
