import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import { deleteImage } from '@/services/firebase/storage'
import { BaseDocument, BaseDocumentData } from '@/types/documents'
import { FirebaseError } from 'firebase/app'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import { RiAddLine, RiArrowLeftSLine, RiMoreLine } from 'react-icons/ri'

const PAGE_SIZE = 10

type RenderProps<T> = {
  deleteHandler: (i: number) => void
  documents: T[]
}

type Props<T, U> = {
  children: (props: RenderProps<T>) => ReactNode
  col: string
  name: string
  create?: U | null
}

export default function OverviewCollection<T extends BaseDocument<U>, U extends BaseDocumentData>({
  children,
  col,
  create,
  name,
}: Props<T, U>) {
  const [documents, setDocuments] = useState<T[] | null>()
  const [error, setError] = useState<FirebaseError | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [hasMoreDocuments, setHasMoreDocuments] = useState(true)

  const router = useRouter()

  useEffect(() => {
    getDocs(query(collection(db, col), orderBy('updated', 'desc'), limit(PAGE_SIZE)))
      .then((docs) => {
        const result = docs.docs.map(
          (doc) => ({ id: doc.id, data: { ...doc.data() } } as unknown as T)
        )
        setDocuments(result)
        setHasMoreDocuments(result.length === PAGE_SIZE)
      })
      .catch((err) => setError(err))
  }, [col])

  if (!documents || isLoading) return <Loading />

  const createHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setIsLoading(true)
    addDoc(collection(db, col), create)
      .then((doc) => {
        const id = doc.id
        const path = router.asPath
        router.push(`${path}/${id}`)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
        setHasMoreDocuments(false)
      })
  }

  const loadMoreHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (documents.length <= 0) return
    const lastUpdated = documents[documents.length - 1].data.updated
    getDocs(
      query(
        collection(db, col),
        orderBy('updated', 'desc'),
        startAfter(lastUpdated),
        limit(PAGE_SIZE)
      )
    )
      .then((docs) => {
        const result = docs.docs.map(
          (doc) => ({ id: doc.id, data: { ...doc.data() } } as unknown as T)
        )
        setDocuments([...documents, ...result])
        setHasMoreDocuments(result.length === PAGE_SIZE)
      })
      .catch((err) => setError(err))
  }

  const deleteHandler = (i: number) => {
    const document = documents[i]
    if (!document) return
    deleteDoc(doc(db, col, document.id))
      .then(() => {
        const splicedDocuments = [...documents].filter((d) => d.id !== document.id)
        setDocuments(splicedDocuments)
      })
      .catch((err) => setError(err))
    deleteImage(`/${col}/${document.id}`).catch((err) => setError(err))
  }

  return (
    <>
      <h1 className="sr-only">{name}</h1>
      <div className="flex justify-between pt-8">
        <button onClick={() => router.back()} className="btn btn-icon-lg btn-primary">
          <RiArrowLeftSLine />
        </button>
        {create && (
          <button onClick={createHandler} className="btn btn-text-icon btn-primary">
            <span>Nieuw</span>
            <RiAddLine />
          </button>
        )}
      </div>
      {!error && <div className="mt-8">{children({ deleteHandler, documents })}</div>}
      {hasMoreDocuments && (
        <div className="mt-8 flex justify-center">
          <button onClick={loadMoreHandler} className="btn btn-text-icon btn-primary">
            <span>Meer</span>
            <RiMoreLine />
          </button>
        </div>
      )}
    </>
  )
}
