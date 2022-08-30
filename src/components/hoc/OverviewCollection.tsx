import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import { FirebaseError } from 'firebase/app'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { ReactNode, useEffect, useState } from 'react'

type RenderProps<T> = {
  documents: T[]
}

type Props<T> = {
  children: (props: RenderProps<T>) => ReactNode
  col: string
  name: string
}

export default function OverviewCollection<T>({ children, col, name }: Props<T>) {
  const [documents, setDocuments] = useState<T[] | null>()
  const [error, setError] = useState<FirebaseError | null>(null)

  useEffect(() => {
    getDocs(query(collection(db, col), orderBy('updated', 'desc'), limit(10)))
      .then((docs) => {
        const result: T[] = []
        docs.forEach((doc) => result.push({ id: doc.id, data: { ...doc.data() } } as unknown as T))
        setDocuments(result)
      })
      .catch((err) => setError(err))
  }, [col])

  if (!documents) return <Loading />

  return (
    <>
      <h1 className="sr-only">{name}</h1>
      {children({ documents })}
    </>
  )
}
