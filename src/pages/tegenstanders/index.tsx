import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import { COL_OPPONENTS, DOC_OPPONENT } from '@/services/firebase/firestore'
import { OpponentDocument, OpponentDocumentData } from '@/types/documents'
import { timestampToTableString } from '@/utils/date'
import React from 'react'

export default function OpponentsPage() {
  return (
    <OverviewCollection<OpponentDocument, OpponentDocumentData>
      col={COL_OPPONENTS}
      create={DOC_OPPONENT}
      name="Tegenstanders"
    >
      {({ deleteHandler, documents }) => (
        <table>
          <thead>
            <tr>
              <th>Naam</th>
              <th>Korte naam</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(({ data, id }, i) => (
              <tr key={id}>
                <td>{data.name}</td>
                <td>{data.short}</td>
                <td>
                  <time>{timestampToTableString(data.created)}</time>
                </td>
                <td>
                  <time>{timestampToTableString(data.updated)}</time>
                </td>
                <td>
                  <ActionButtons deleteHandler={deleteHandler} i={i} url={`/tegenstanders/${id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </OverviewCollection>
  )
}

OpponentsPage.Layout = 'root'
