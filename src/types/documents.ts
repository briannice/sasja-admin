import { Timestamp } from 'firebase/firestore'

export type BaseDocument = {
  id: string
  data: {
    created: Timestamp
    updated: Timestamp
  }
}

export type EventDocument = BaseDocument & {
  data: {
    name: string
    content: string
    time: Timestamp
    location: string
    public: boolean
  }
}
