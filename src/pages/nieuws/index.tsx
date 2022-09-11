import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import { COL_NEWS, DOC_NEWS } from '@/services/firebase/firestore'
import { NewsDocument, NewsDocumentData } from '@/types/documents'
import { timestampToString } from '@/utils/date'
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
        orderField="time"
        orderDirection="desc"
      >
        {({ deleteHandler, documents }) => (
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Datum</th>
                <th>Tag</th>
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
                    <time>{timestampToString(data.time, 'DD/MM')}</time>
                  </td>
                  <td>
                    <p>{data.tag}</p>
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
