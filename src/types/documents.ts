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
  uid: string
  youth: boolean
  competitions: {
    name: string
    serieId: number
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
  backNumber: number
  birthday: Timestamp
  public: boolean

  teamId: string
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
  content: string
  time: Timestamp

  teamId: string
  opponentId: string
}

export type MatchReportDocument = BaseDocument<MatchReportDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                           GAME                                                 //
// ---------------------------------------------------------------------------------------------- //
export type GameDocumentData = BaseDocumentData & {
  teamId: string
  opponentId: string
}

export type GameDocument = BaseDocument<GameDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                           STAFF                                                //
// ---------------------------------------------------------------------------------------------- //
export type StaffDocumentData = BaseDocumentData & {
  name: string
}

export type StaffDocument = BaseDocument<StaffDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                         OPPONENT                                               //
// ---------------------------------------------------------------------------------------------- //
export type OpponentDocumentData = BaseDocumentData & {
  name: string
}

export type OpponentDocument = BaseDocument<OpponentDocumentData>
