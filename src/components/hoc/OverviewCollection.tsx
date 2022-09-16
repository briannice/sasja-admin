import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import { deleteImage } from '@/services/firebase/storage'
import { BaseDocument, BaseDocumentData } from '@/types/documents'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import { RiAddLine, RiArrowLeftSLine, RiMoreLine } from 'react-icons/ri'

const PAGE_SIZE = 2

type RenderProps<T> = {
  deleteHandler: (i: number) => void
  documents: T[]
}

type Props<T, U> = {
  children: (props: RenderProps<T>) => ReactNode
  col: string
  name: string
  create?: U | null
  errs?: FirestoreError[]
  loading?: boolean
  orderField?: string
  orderDirection?: 'asc' | 'desc'
}

export default function OverviewCollection<T extends BaseDocument<U>, U extends BaseDocumentData>({
  children,
  col,
  name,
  create = null,
  errs = [],
  loading = false,
  orderField = 'updated',
  orderDirection = 'asc',
}: Props<T, U>) {
  // List of documents of the given collection or null if no documents are fetched.
  const [documents, setDocuments] = useState<T[] | null>(null)

  // List of Firestore errors.
  const [errors, setErrors] = useState<FirestoreError[]>(errs)

  // Boolean indicating whether the component is in a loading state.
  const [isLoading, setIsLoading] = useState(loading)

  // Boolean indicating whether there can be more documents fetched.
  const [hasMoreDocuments, setHasMoreDocuments] = useState(true)

  // Next.js router object
  const router = useRouter()

  // Load initial documents
  useEffect(() => {
    getDocs(query(collection(db, col), orderBy(orderField, orderDirection), limit(PAGE_SIZE)))
      .then((docs) => {
        const result = docs.docs.map(
          (doc) => ({ id: doc.id, data: { ...doc.data() } } as unknown as T)
        )
        setDocuments(result)
        setIsLoading(false && loading)
        setHasMoreDocuments(result.length === PAGE_SIZE)
      })
      .catch((err: FirestoreError) => setErrors((errors) => [...errors, err]))
  }, [col, loading, orderField, orderDirection])

  // If there are errors, return error page.
  if (errors.length > 0) return <Error firestoreErrors={errors} />

  // If there are no documents or the component is in the loading state, show loading screen.
  if (!documents || isLoading) return <Loading />

  // Create a new document for the given collection.
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
        setErrors([...errors, err])
        setIsLoading(false)
      })
  }

  // Load more documents of the given collection.
  const loadMoreHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (documents.length <= 0) return

    const lastDocument = documents[documents.length - 1]
    let lastUpdated: any = null
    Object.entries(lastDocument.data).find(([key, value]) => {
      if (key === orderField) {
        lastUpdated = value
      }
    })

    if (!lastUpdated) return

    getDocs(
      query(
        collection(db, col),
        orderBy(orderField, orderDirection),
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
      .catch((err) => setErrors([...errors, err]))
  }

  // Delete a document of the given collection based on the index in the list of documents.
  const deleteHandler = (i: number) => {
    const document = documents[i]
    if (!document) return
    deleteDoc(doc(db, col, document.id))
      .then(() => {
        const splicedDocuments = [...documents].filter((d) => d.id !== document.id)
        setDocuments(splicedDocuments)
      })
      .catch((err) => setErrors([...errors, err]))
    deleteImage(`/${col}/${document.id}`).catch((err) => console.log(err))
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
      <div className="mt-8">{children({ deleteHandler, documents })}</div>
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
