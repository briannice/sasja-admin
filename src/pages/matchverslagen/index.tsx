import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import { COL_MATCHREPORT, DOC_MATCHREPORT } from '@/services/firebase/firestore'
import { MatchReportDocument, MatchReportDocumentData } from '@/types/documents'
import { timestampToString } from '@/utils/date'
import Head from 'next/head'
import React from 'react'

export default function MatchReportPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Matchverslagen</title>
      </Head>
      <OverviewCollection<MatchReportDocument, MatchReportDocumentData>
        col={COL_MATCHREPORT}
        create={DOC_MATCHREPORT}
        name="Matchverslagen"
        orderField="time"
        orderDirection="desc"
      >
        {({ deleteHandler, documents }) => (
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Tegenstander</th>
                <th>Datum</th>
                <th>Publiceren</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(({ data, id }, i) => (
                <tr key={id}>
                  <td className="font-bold">{data.team.name}</td>
                  <td className="font-bold">{data.opponent.short}</td>
                  <td>
                    <time>{timestampToString(data.time, 'DD/MM')}</time>
                  </td>
                  <td>
                    <SwitchHandler
                      col={COL_MATCHREPORT}
                      id={id}
                      initial={data.public}
                      name="public"
                    />
                  </td>
                  <td>
                    <ActionButtons
                      deleteHandler={deleteHandler}
                      i={i}
                      urlEdit={`/matchverslagen/${id}`}
                      urlView={`/matchverslag/${id}`}
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

MatchReportPage.Layout = 'root'
