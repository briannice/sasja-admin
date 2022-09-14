import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import { COL_OPPONENTS, DOC_OPPONENT } from '@/services/firebase/firestore'
import { OpponentDocument, OpponentDocumentData } from '@/types/documents'
import Head from 'next/head'
import React from 'react'

export default function OpponentsPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Tegenstanders</title>
      </Head>
      <OverviewCollection<OpponentDocument, OpponentDocumentData>
        col={COL_OPPONENTS}
        create={DOC_OPPONENT}
        name="Tegenstanders"
        orderField="name"
      >
        {({ deleteHandler, documents }) => (
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Korte naam</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(({ data, id }, i) => (
                <tr key={id}>
                  <td className="font-bold">{data.name}</td>
                  <td className="font-bold">{data.short}</td>
                  <td>
                    <ActionButtons
                      deleteHandler={deleteHandler}
                      i={i}
                      urlEdit={`/tegenstanders/${id}`}
                      urlView={`/tegenstanders/${id}`}
                      canView={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </OverviewCollection>
    </>
  )
}

OpponentsPage.Layout = 'root'
