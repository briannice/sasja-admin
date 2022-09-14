import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import { COL_PLAYERS, DOC_PLAYERS } from '@/services/firebase/firestore'
import { PlayerDocument, PlayerDocumentData } from '@/types/documents'
import Head from 'next/head'
import React from 'react'

export default function PlayersOverviewPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Spelers</title>
      </Head>
      <OverviewCollection<PlayerDocument, PlayerDocumentData>
        col={COL_PLAYERS}
        create={DOC_PLAYERS}
        name="Spelers"
        orderField="lastname"
      >
        {({ deleteHandler, documents }) => (
          <table>
            <thead>
              <tr>
                <th>Voornaam</th>
                <th>Achternaam</th>
                <th>Publiceren</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(({ id, data }, i) => (
                <tr key={i}>
                  <td>
                    <p>{data.firstname}</p>
                  </td>
                  <td>
                    <p>{data.lastname}</p>
                  </td>
                  <td>
                    <SwitchHandler col={COL_PLAYERS} id={id} initial={data.public} name="public" />
                  </td>
                  <td>
                    <ActionButtons
                      deleteHandler={deleteHandler}
                      i={i}
                      urlEdit={`/spelers/${id}`}
                      urlView={`/spelers/${id}`}
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

PlayersOverviewPage.Layout = 'root'
