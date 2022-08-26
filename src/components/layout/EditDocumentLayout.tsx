import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import { FirebaseError } from 'firebase/app'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

type RenderProps<T> = {
  document: T
  setDocument: Dispatch<SetStateAction<T | null>>
}

type Props<T> = {
  children: (props: RenderProps<T>) => ReactNode
  col: string
  name: string
}

export default function EditDocumentLayout<T>({ children, col, name }: Props<T>) {
  const [document, setDocument] = useState<T | null>(null)
  const [error, setError] = useState<FirebaseError | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const documentId = router.asPath.split('/').pop() as string

  useEffect(() => {
    getDoc(doc(db, col, documentId))
      .then((d) => {
        setDocument({ ...d.data() } as unknown as T)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [col, documentId])

  if (!document || isLoading) return <Loading />

  return (
    <>
      <div>
        <h1>{name}</h1>
        {error && <p>{error.message}</p>}
      </div>
      <form>{children({ document, setDocument })}</form>
    </>
  )
}
