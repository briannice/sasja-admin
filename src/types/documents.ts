import { Timestamp } from 'firebase/firestore'

export type BaseDocument<T> = {
  id: string
  data: T
}

export type BaseDocumentData = {
  created: Timestamp
  updated: Timestamp
}

export type EventDocumentData = BaseDocumentData & {
  name: string
  content: string
  time: Timestamp
  location: string
  address: string
  public: boolean
}

export type EventDocument = BaseDocument<EventDocumentData>
