import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import { COL_EVENTS, DOC_EVENTS } from '@/services/firebase/firestore'
import { EventDocument, EventDocumentData } from '@/types/documents'
import { timestampToTableString } from '@/utils/date'
import Head from 'next/head'
import React from 'react'

export default function EventOverviewPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Evenementen</title>
      </Head>
      <OverviewCollection<EventDocument, EventDocumentData>
        col={COL_EVENTS}
        create={DOC_EVENTS}
        name="evenementen"
      >
        {({ deleteHandler, documents }) => (
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Publiceren</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(({ id, data }, i) => (
                <tr key={id}>
                  <td>
                    <p>{data.name}</p>
                  </td>
                  <td>
                    <time>{timestampToTableString(data.created)}</time>
                  </td>
                  <td>
                    <time>{timestampToTableString(data.updated)}</time>
                  </td>
                  <td>
                    <SwitchHandler col={COL_EVENTS} id={id} initial={data.public} name="public" />
                  </td>
                  <td>
                    <ActionButtons deleteHandler={deleteHandler} i={i} url={`/evenementen/${id}`} />
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

EventOverviewPage.Layout = 'root'
