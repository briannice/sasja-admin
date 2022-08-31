import { Timestamp } from 'firebase/firestore'

export type BaseDocumentData = {
  created: Timestamp
  updated: Timestamp
}

export type BaseDocument<T> = {
  id: string
  data: BaseDocumentData & T
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
