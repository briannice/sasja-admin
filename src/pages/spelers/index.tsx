import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import { COL_PLAYERS, DOC_PLAYERS } from '@/services/firebase/firestore'
import { PlayerDocument, PlayerDocumentData } from '@/types/documents'
import { timestampToTableString } from '@/utils/date'
import React from 'react'

export default function PlayersOverviewPage() {
  return (
    <OverviewCollection<PlayerDocument, PlayerDocumentData>
      col={COL_PLAYERS}
      create={DOC_PLAYERS}
      name="Spelers"
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
              <tr key={i}>
                <td>
                  <p>{`${data.firstname} ${data.lastname}`}</p>
                </td>
                <td>
                  <time>{timestampToTableString(data.created)}</time>
                </td>
                <td>
                  <time>{timestampToTableString(data.updated)}</time>
                </td>
                <td>
                  <SwitchHandler col={COL_PLAYERS} id={id} initial={data.public} name="public" />
                </td>
                <td>
                  <ActionButtons deleteHandler={deleteHandler} i={i} url={`/spelers/${id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </OverviewCollection>
  )
}

PlayersOverviewPage.Layout = 'root'
