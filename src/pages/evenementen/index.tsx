import OverviewCollection from '@/components/hoc/OverviewCollection'
import { EventDocument } from '@/types/documents'
import { timestampToTableString } from '@/utils/date'
import React from 'react'

export default function EventOverviewPage() {
  return (
    <OverviewCollection<EventDocument> col="events" name="evenementen">
      {({ documents }) => (
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
            {documents.map(({ id, data }) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </OverviewCollection>
  )
}

EventOverviewPage.Layout = 'root'
