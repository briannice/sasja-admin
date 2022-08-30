import { Timestamp } from 'firebase/firestore'

export type BaseDocument<T> = {
  id: string
  data: T
}

export type EventDocumentData = {
  name: string
  content: string
  time: Timestamp
  location: string
  address: string
  public: boolean
}

export type EventDocument = BaseDocument<EventDocumentData>
