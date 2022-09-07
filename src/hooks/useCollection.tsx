import { db } from '@/services/firebase'
import { collection, FirestoreError, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function useCollection<T>(col: string) {
  const [documents, setDocuments] = useState<T[] | null>(null)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    getDocs(collection(db, col))
      .then((docs) => {
        const result = docs.docs.map((doc) => ({ id: doc.id, data: doc.data() } as unknown as T))
        setDocuments(result)
      })
      .catch((err) => {
        setError(err)
      })
  }, [col])

  return [documents, error] as const
}
