import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import { doc, FirestoreError, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, {
  Dispatch,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { RiArrowLeftSLine, RiCheckLine, RiLoaderLine, RiSaveLine } from 'react-icons/ri'

type RenderProps<T> = {
  document: T
  id: string
  setDocument: Dispatch<SetStateAction<T | null>>
}

type Props<T> = {
  children: (props: RenderProps<T>) => ReactNode
  col: string
  name: string
  errs?: FirestoreError[]
}

export default function EditDocument<T>({ children, col, name, errs = [] }: Props<T>) {
  const [document, setDocument] = useState<T | null>(null)
  const [errors, setErrors] = useState<FirestoreError[]>(errs)

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()
  const id = router.asPath.split('/').pop() as string

  useEffect(() => {
    getDoc(doc(db, col, id))
      .then((d) => {
        if (d.exists()) {
          setDocument({ ...d.data() } as unknown as T)
        } else {
          router.push('/404')
        }
      })
      .catch((err) => setErrors((errors) => [...errors, err]))
      .finally(() => setIsLoading(false))
  }, [col, id, router])

  if (errors.length > 0) return <Error firestoreErrors={errors} />

  if (!document) return <Loading />

  const updateDocument = () => {
    setIsLoading(true)
    updateDoc(doc(db, col, id), { ...document, updated: Timestamp.now() })
      .then(() => setIsSuccess(true))
      .catch((err) => setErrors([...errors, err]))
      .finally(() => setIsLoading(false))
  }

  const updateDocumentBySubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    updateDocument()
  }

  const updateDocumentByClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    updateDocument()
  }

  return (
    <>
      <h1 className="sr-only">{name}</h1>
      <div className="sticky inset-x-0 top-0 z-20 flex bg-white py-8">
        <button onClick={() => router.back()} className="btn btn-icon-lg btn-primary mr-8">
          <RiArrowLeftSLine className="h-8 w-8" />
        </button>
        <button onClick={updateDocumentByClick} className="btn btn-text-icon btn-primary mr-auto">
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
        ) : (
          <></>
        )}
      </div>
      <form onSubmit={updateDocumentBySubmit} className="grid grid-cols-2 gap-8">
        {children({ document, id, setDocument })}
      </form>
    </>
  )
}
