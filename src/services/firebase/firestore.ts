import { EventDocumentData } from '@/types/documents'
import { Timestamp } from 'firebase/firestore'

// Collection names
export const COL_EVENTS = 'events'
export const COL_MATCHREPORT = 'matchreport'
export const COL_NEWS = 'news'
export const COL_TEAMS = 'teams'
export const COL_PLAYERS = 'players'
export const COL_GAMES = 'games'
export const COL_STAFF = 'staff'
export const COL_OPPONENTS = 'opponents'

// Initial documents
export const DOC_EVENTS: EventDocumentData = {
  address: '',
  content: '',
  created: Timestamp.now(),
  location: '',
  name: '',
  public: false,
  time: Timestamp.now(),
  updated: Timestamp.now(),
}