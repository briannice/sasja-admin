import {
  EventDocumentData,
  MatchReportDocumentData,
  NewsDocumentData,
  OpponentDocumentData,
  PlayerDocumentData,
  TeamDocumentData,
} from '@/types/documents'
import { Timestamp } from 'firebase/firestore'

// Collection names
export const COL_EVENTS = 'events'
export const COL_MATCHREPORT = 'matchreport'
export const COL_NEWS = 'news'
export const COL_TEAMS = 'teams'
export const COL_OPPONENTS = 'opponents'
export const COL_PLAYERS = 'players'
export const COL_STAFF = 'staff'

// Defualt foreign keys
export const FK_TEAMS = 'Geen team'
export const FK_OPPONENTS = 'Geen tegenstander'

// Default sub documents
export const MATCHREPORT_TEAM_OBJECT = {
  id: 'geen-team',
  name: 'Geen team',
}
export const MATCHREPORT_OPPONENT_OBJECT = {
  id: 'geen-tegenstander',
  name: 'Geen tegenstander',
  short: '',
  logo: '',
}

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

export const DOC_MATCHREPORT: MatchReportDocumentData = {
  content: '',
  created: Timestamp.now(),
  tag: 'COMPETITIE',
  time: Timestamp.now(),
  updated: Timestamp.now(),
  writer: '',
  home: true,
  score: [],
  public: false,
  teamId: FK_TEAMS,
  opponentId: FK_OPPONENTS,
  team: MATCHREPORT_TEAM_OBJECT,
  opponent: MATCHREPORT_OPPONENT_OBJECT,
}

export const DOC_OPPONENT: OpponentDocumentData = {
  created: Timestamp.now(),
  logo: '',
  name: '',
  short: '',
  updated: Timestamp.now(),
}
