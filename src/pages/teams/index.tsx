import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import { COL_TEAMS, DOC_TEAMS } from '@/services/firebase/firestore'
import { TeamDocument, TeamDocumentData } from '@/types/documents'
import { timestampToTableString } from '@/utils/date'
import React from 'react'

export default function TeamOverviewPage() {
  return (
    <OverviewCollection<TeamDocument, TeamDocumentData>
      col={COL_TEAMS}
      create={DOC_TEAMS}
      name="Teams"
    >
      {({ deleteHandler, documents }) => (
        <>
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>UID</th>
                <th>Created</th>
                <th>Updated</th>
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
                    <p>{data.uid}</p>
                  </td>
                  <td>
                    <time>{timestampToTableString(data.created)}</time>
                  </td>
                  <td>
                    <time>{timestampToTableString(data.updated)}</time>
                  </td>
                  <td>
                    <ActionButtons deleteHandler={deleteHandler} i={i} url={`/teams/${id}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </OverviewCollection>
  )
}

TeamOverviewPage.Layout = 'root'
