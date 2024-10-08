import { OpponentModel, ScoreModel, TeamModel } from '@/types/models'
import { Timestamp } from 'firebase/firestore'

// ---------------------------------------------------------------------------------------------- //
//                                           BASE                                                 //
// ---------------------------------------------------------------------------------------------- //
export type BaseDocumentData = {
  created: Timestamp
  updated: Timestamp
}

export type BaseDocument<T> = {
  id: string
  data: BaseDocumentData & T
}

// ---------------------------------------------------------------------------------------------- //
//                                           EVENT                                                //
// ---------------------------------------------------------------------------------------------- //
export type EventDocumentData = BaseDocumentData & {
  name: string
  content: string
  time: Timestamp
  location: string
  address: string
  public: boolean
}

export type EventDocument = BaseDocument<EventDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                           TEAM                                                 //
// ---------------------------------------------------------------------------------------------- //
export type TeamDocumentData = BaseDocumentData & {
  name: string
  youth: boolean
  calender: string
  sortOrder: number
  competitions: {
    name: string
    serieId: number
    vhvId: number
    ranking: boolean
  }[]
}

export type TeamDocument = BaseDocument<TeamDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                          PLAYER                                                //
// ---------------------------------------------------------------------------------------------- //
export type PlayerDocumentData = BaseDocumentData & {
  firstname: string
  lastname: string
  position: string
  description: string
  backNumber: string
  birthday: Timestamp
  registration: Timestamp
  public: boolean
  team: TeamModel
}

export type PlayerDocument = BaseDocument<PlayerDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                           NEWS                                                 //
// ---------------------------------------------------------------------------------------------- //
export type NewsDocumentData = BaseDocumentData & {
  title: string
  time: Timestamp
  content: string
  tag: string
  public: boolean
  pinned: boolean
}

export type NewsDocument = BaseDocument<NewsDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                        MATCHREPORT                                             //
// ---------------------------------------------------------------------------------------------- //
export type MatchReportDocumentData = BaseDocumentData & {
  time: Timestamp
  tag: string
  writer: string
  home: boolean
  score: ScoreModel[]
  content: string
  public: boolean
  team: TeamModel
  opponent: OpponentModel
}

export type MatchReportDocument = BaseDocument<MatchReportDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                           STAFF                                                //
// ---------------------------------------------------------------------------------------------- //
export type StaffDocumentData = BaseDocumentData & {
  name: string
}

export type StaffDocument = BaseDocument<StaffDocumentData>
