import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
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
                <td>
                  <SwitchHandler col="events" id={id} initial={data.public} name="public" />
                </td>
                <td>
                  <ActionButtons edit={`/evenementen/${id}`} view="" />
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
