import { FirestoreError } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { RiErrorWarningLine, RiRefreshLine } from 'react-icons/ri'

type Props = {
  firestoreErrors?: FirestoreError[]
}

export default function Error({ firestoreErrors = [] }: Props) {
  const router = useRouter()

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center divide-y divide-light">
      <h1 className="pb-8 text-3xl">Something went wrong...</h1>
      <div className="flex flex-col items-center space-y-4 py-8">
        <p className="font-kanit text-lg text-dark">Refresh</p>
        <button onClick={() => router.reload()} className="btn btn-primary rounded-full p-2.5">
          <RiRefreshLine className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-2 pt-8">
        {firestoreErrors.map((err, i) => (
          <div
            key={i}
            className="flex w-96 space-x-4 rounded-lg border-2 border-primary bg-primary/20 px-4 py-2"
          >
            <div className="flex items-center">
              <RiErrorWarningLine className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="font-kanit text-xl capitalize text-primary">{err.code}</p>
              <p className="text-sm text-primary">{err.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
