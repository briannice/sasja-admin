import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import { COL_NEWS, DOC_NEWS } from '@/services/firebase/firestore'
import { NewsDocument, NewsDocumentData } from '@/types/documents'
import { timestampToTableString } from '@/utils/date'
import Head from 'next/head'
import React from 'react'

export default function NewsOverviewPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Nieuws</title>
      </Head>
      <OverviewCollection<NewsDocument, NewsDocumentData>
        col={COL_NEWS}
        create={DOC_NEWS}
        name="Nieuws"
      >
        {({ deleteHandler, documents }) => (
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Publiceren</th>
                <th>Pinnen</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(({ id, data }, i) => (
                <tr key={id}>
                  <td>
                    <p>{data.title}</p>
                  </td>
                  <td>
                    <time>{timestampToTableString(data.created)}</time>
                  </td>
                  <td>
                    <time>{timestampToTableString(data.updated)}</time>
                  </td>
                  <td>
                    <SwitchHandler col={COL_NEWS} id={id} initial={data.public} name="public" />
                  </td>
                  <td>
                    <SwitchHandler col={COL_NEWS} id={id} initial={data.pinned} name="pinned" />
                  </td>
                  <td>
                    <ActionButtons deleteHandler={deleteHandler} i={i} url={`/nieuws/${id}`} />
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

NewsOverviewPage.Layout = 'root'
