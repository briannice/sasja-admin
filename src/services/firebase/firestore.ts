import {
  EventDocumentData,
  NewsDocumentData,
  PlayerDocumentData,
  TeamDocumentData,
} from '@/types/documents'
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

// Defualt foreign keys
export const FK_TEAMS = 'Geen team'

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

export const DOC_PLAYERS: PlayerDocumentData = {
  backNumber: 0,
  birthday: Timestamp.now(),
  created: Timestamp.now(),
  description: '',
  firstname: '',
  lastname: '',
  position: '',
  public: false,
  registration: Timestamp.now(),
  teamId: FK_TEAMS,
  updated: Timestamp.now(),
}
