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
  registration: Timestamp
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
//                                          OPPONENT                                              //
// ---------------------------------------------------------------------------------------------- //
export type OpponentDocumentData = BaseDocumentData & {
  name: string
  short: string
  logo: string
}

export type OpponentDocument = BaseDocument<OpponentDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                        MATCHREPORT                                             //
// ---------------------------------------------------------------------------------------------- //
export type MatchReportDocumentData = BaseDocumentData & {
  time: Timestamp
  tag: string
  writer: string
  content: string
  teamId: string
  home: boolean
  score: string
}

export type MatchReportDocument = BaseDocument<MatchReportDocumentData>

// ---------------------------------------------------------------------------------------------- //
//                                           STAFF                                                //
// ---------------------------------------------------------------------------------------------- //
export type StaffDocumentData = BaseDocumentData & {
  name: string
}

export type StaffDocument = BaseDocument<StaffDocumentData>
