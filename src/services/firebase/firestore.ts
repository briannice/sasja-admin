import { EventDocumentData, NewsDocumentData, TeamDocumentData } from '@/types/documents'
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

export const DOC_NEWS: NewsDocumentData = {
  content: '',
  created: Timestamp.now(),
  pinned: false,
  public: false,
  tag: 'CLUB',
  time: Timestamp.now(),
  title: '',
  updated: Timestamp.now(),
}

export const DOC_TEAMS: TeamDocumentData = {
  competitions: [],
  created: Timestamp.now(),
  name: '',
  uid: '',
  updated: Timestamp.now(),
  youth: false,
}
