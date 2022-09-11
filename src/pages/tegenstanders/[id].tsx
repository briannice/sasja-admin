import TextInput from '@/components/form/TextInput'
import EditDocument from '@/components/hoc/EditDocument'
import { COL_OPPONENTS } from '@/services/firebase/firestore'
import { OpponentDocumentData } from '@/types/documents'
import Head from 'next/head'
import React from 'react'

export default function OpponentEditPage() {
  return (
    <>
      <EditDocument<OpponentDocumentData> col={COL_OPPONENTS} name="Tegenstander">
        {({ document, setDocument }) => (
          <>
            <Head>
              <title>Sasja Admin | Tegenstanders</title>
            </Head>
            <TextInput
              type="text"
              name="Naam"
              value={document.name}
              onChange={(v) => setDocument({ ...document, name: v })}
            />
            <TextInput
              type="text"
              name="Korte naam"
              value={document.short}
              onChange={(v) => setDocument({ ...document, short: v })}
            />
            <TextInput
              type="text"
              name="Logo"
              value={document.logo}
              onChange={(v) => setDocument({ ...document, logo: v })}
            />
          </>
        )}
      </EditDocument>
    </>
  )
}

OpponentEditPage.Layout = 'root'
