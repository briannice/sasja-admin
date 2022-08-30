import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import { FirebaseError } from 'firebase/app'
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import {
  RiArrowLeftSLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiLoaderLine,
  RiSaveLine,
} from 'react-icons/ri'

type RenderProps<T> = {
  document: T
  id: string
  setDocument: Dispatch<SetStateAction<T | null>>
}

type Props<T> = {
  children: (props: RenderProps<T>) => ReactNode
  col: string
  name: string
}

export default function EditDocument<T>({ children, col, name }: Props<T>) {
  const [document, setDocument] = useState<T | null>(null)
  const [error, setError] = useState<FirebaseError | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()
  const id = router.asPath.split('/').pop() as string

  useEffect(() => {
    getDoc(doc(db, col, id))
      .then((d) => setDocument({ ...d.data() } as unknown as T))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [col, id])

  if (!document) return <Loading />

  const updateDocument: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setIsLoading(true)
    updateDoc(doc(db, col, id), { ...document, updated: Timestamp.now() })
      .then(() => setIsSuccess(true))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <h1 className="sr-only">{name}</h1>
      <div className="flex">
        <button
          onClick={() => {
            setIsLoading(true)
            router.back()
          }}
          className="btn btn-primary mr-8 block rounded-full p-1"
        >
          <RiArrowLeftSLine className="h-8 w-8" />
        </button>
        <button onClick={updateDocument} className="btn btn-text-icon btn-primary mr-auto">
          <span>Save</span>
          <RiSaveLine />
        </button>
        {isLoading ? (
          <div className="toast toast-info">
            <span>Opslaan</span>
            <RiLoaderLine className="animate-spin" />
          </div>
        ) : isSuccess ? (
          <div className="toast toast-success">
            <span>Success</span>
            <RiCheckLine />
          </div>
        ) : error ? (
          <div className="toast toast-error">
            <span>Oeps, er is iets mis gegaan</span>
            <RiErrorWarningLine />
          </div>
        ) : (
          <></>
        )}
      </div>
      <form className="mt-8 grid grid-cols-2 gap-8">{children({ document, id, setDocument })}</form>
    </>
  )
}
