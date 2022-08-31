import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import { FirebaseError } from 'firebase/app'
import { addDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import { RiAddLine, RiArrowLeftSLine } from 'react-icons/ri'

type RenderProps<T> = {
  documents: T[]
}

type Props<T, U> = {
  children: (props: RenderProps<T>) => ReactNode
  col: string
  create: U
  name: string
}

export default function OverviewCollection<T, U>({ children, col, create, name }: Props<T, U>) {
  const [documents, setDocuments] = useState<T[] | null>()
  const [error, setError] = useState<FirebaseError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    getDocs(query(collection(db, col), orderBy('updated', 'desc'), limit(10)))
      .then((docs) => {
        const result: T[] = []
        docs.forEach((doc) => result.push({ id: doc.id, data: { ...doc.data() } } as unknown as T))
        setDocuments(result)
      })
      .catch((err) => setError(err))
  }, [col])

  if (!documents || isLoading) return <Loading />

  const createHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsLoading(true)
    e.preventDefault()
    addDoc(collection(db, col), create)
      .then((doc) => {
        const id = doc.id
        const path = router.asPath
        router.push(`${path}/${id}`)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }

  return (
    <>
      <h1 className="sr-only">{name}</h1>
      <div className="flex justify-between">
        <button onClick={() => router.back()} className="btn btn-icon-lg btn-primary">
          <RiArrowLeftSLine />
        </button>
        <button onClick={createHandler} className="btn btn-text-icon btn-primary">
          <span>Nieuw</span>
          <RiAddLine />
        </button>
      </div>
      <div className="mt-8">{children({ documents })}</div>
    </>
  )
}
