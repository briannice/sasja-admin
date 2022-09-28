import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import { COL_EVENTS, DOC_EVENTS } from '@/services/firebase/firestore'
import { EventDocument, EventDocumentData } from '@/types/documents'
import { timestampToString } from '@/utils/date'
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
        orderField="time"
        orderDirection="desc"
      >
        {({ deleteHandler, documents }) => (
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Datum</th>
                <th>Tijd</th>
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
                    <time>{timestampToString(data.time, 'DD/MM')}</time>
                  </td>
                  <td>
                    <time>{timestampToString(data.time, 'HH:mm')}</time>
                  </td>
                  <td>
                    <SwitchHandler col={COL_EVENTS} id={id} initial={data.public} name="public" />
                  </td>
                  <td>
                    <ActionButtons
                      deleteHandler={deleteHandler}
                      i={i}
                      urlEdit={`/evenementen/${id}`}
                      urlView={`/evenement/${id}`}
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

EventOverviewPage.Layout = 'root'
