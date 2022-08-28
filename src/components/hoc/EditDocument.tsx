import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import { FirebaseError } from 'firebase/app'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { RiSaveLine } from 'react-icons/ri'

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

  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const id = router.asPath.split('/').pop() as string

  useEffect(() => {
    getDoc(doc(db, col, id))
      .then((d) => {
        setDocument({ ...d.data() } as unknown as T)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [col, id])

  if (!document || isLoading) return <Loading />

  return (
    <>
      <h1>{name}</h1>
      <div className="flex justify-between">
        <div>{error && <p>{error.message}</p>}</div>
        <button className="btn btn-text-icon btn-primary">
          <span>Save</span>
          <RiSaveLine />
        </button>
      </div>
      <form className="grid grid-cols-2 gap-8">{children({ document, id, setDocument })}</form>
    </>
  )
}
