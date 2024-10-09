import {
  EventDocumentData,
  MatchReportDocumentData,
  NewsDocumentData,
  PlayerDocumentData,
  TeamDocumentData,
} from '@/types/documents'
import { OpponentModel, TeamModel } from '@/types/models'
import { Timestamp } from 'firebase/firestore'

// Collection names
export const COL_EVENTS = 'events'
export const COL_MATCHREPORT = 'matchreport'
export const COL_NEWS = 'news'
export const COL_TEAMS = 'teams'
export const COL_PLAYERS = 'players'

// Defualt foreign keys
export const FK_TEAMS = 'Geen team'
export const FK_OPPONENTS = 'Geen tegenstander'

// Default sub documents
export const MATCHREPORT_TEAM_OBJECT: TeamModel = {
  id: 'geen-team',
  name: 'Geen team',
}

export const PLAYER_TEAM_OBJECT: TeamModel = {
  id: 'geen-team',
  name: 'Geen team',
}

export const MATCHREPORT_OPPONENT_OBJECT: OpponentModel = {
  id: -1,
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
  calender: '',
  sortOrder: 99,
}

export const DOC_PLAYERS: PlayerDocumentData = {
  backNumber: '',
  birthday: Timestamp.now(),
  created: Timestamp.now(),
  description: '',
  firstname: '',
  lastname: '',
  position: '',
  public: false,
  registration: Timestamp.now(),
  team: PLAYER_TEAM_OBJECT,
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
  team: MATCHREPORT_TEAM_OBJECT,
  opponent: MATCHREPORT_OPPONENT_OBJECT,
}
