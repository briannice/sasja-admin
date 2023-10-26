import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import { COL_TEAMS } from '@/services/firebase/firestore'
import { TeamDocument, TeamDocumentData } from '@/types/documents'
import Head from 'next/head'
import React from 'react'

export default function TeamOverviewPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Teams</title>
      </Head>
      <OverviewCollection<TeamDocument, TeamDocumentData>
        col={COL_TEAMS}
        name="Teams"
        orderField="sortOrder"
      >
        {({ deleteHandler, documents }) => (
          <>
            <table>
              <thead>
                <tr>
                  <th>Naam</th>
                  <th>UID</th>
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
                      <p>{id}</p>
                    </td>

                    <td>
                      <ActionButtons
                        deleteHandler={deleteHandler}
                        i={i}
                        urlEdit={`/teams/${id}`}
                        urlView={`/team/${id}`}
                        canDelete={false}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </OverviewCollection>
    </>
  )
}

TeamOverviewPage.Layout = 'root'
