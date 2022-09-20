import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import useCollection from '@/hooks/useCollection'
import { db } from '@/services/firebase'
import {
  COL_MATCHREPORT,
  COL_OPPONENTS,
  COL_TEAMS,
  DOC_MATCHREPORT,
} from '@/services/firebase/firestore'
import {
  MatchReportDocument,
  MatchReportDocumentData,
  OpponentDocument,
  TeamDocument,
} from '@/types/documents'
import { timestampToString } from '@/utils/date'
import { doc, FirestoreError, updateDoc } from 'firebase/firestore'
import Head from 'next/head'
import React from 'react'

export default function MatchReportPage() {
  const [teams, errorTeams] = useCollection<TeamDocument>(COL_TEAMS)
  const [opponents, errorOpponents] = useCollection<OpponentDocument>(COL_OPPONENTS)

  const getTeamNameById = (id: string) => {
    if (!teams) return ''
    const index = teams.findIndex((team) => team.id === id)
    if (index === -1) return ''
    return teams[index].data.name
  }

  const getOpponentNameById = (id: string) => {
    if (!opponents) return ''
    const index = opponents.findIndex((opponent) => opponent.id === id)
    if (index === -1) return ''
    return opponents[index].data.name
  }

  const errors: FirestoreError[] = []
  if (errorTeams) errors.push(errorTeams)
  if (errorOpponents) errors.push(errorOpponents)

  const getTeamById = (id: string) => teams?.find((team) => team.id === id)
  const getOpponentById = (id: string) => opponents?.find((opponent) => opponent.id === id)

  return (
    <>
      <Head>
        <title>Sasja Admin | Matchverslagen</title>
      </Head>
      <OverviewCollection<MatchReportDocument, MatchReportDocumentData>
        col={COL_MATCHREPORT}
        create={DOC_MATCHREPORT}
        name="Matchverslagen"
        errs={errors}
        loading={!teams || !opponents}
        orderField="time"
        orderDirection="desc"
      >
        {({ deleteHandler, documents }) => (
          <>
            <div>
              <button
                onClick={() => {
                  documents.forEach((document) => {
                    const team = getTeamById(document.data.teamId)
                    const opponent = getOpponentById(document.data.opponentId)
                    if (team && opponent) {
                      updateDoc(doc(db, COL_MATCHREPORT, document.id), {
                        ...document,
                        team: { id: team.id, name: team.data.name },
                        opponent: {
                          id: opponent.id,
                          name: opponent.data.name,
                          short: opponent.data.short,
                          logo: opponent.data.logo,
                        },
                      })
                    }
                  })
                }}
              >
                click
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Tegenstander</th>
                  <th>Datum</th>
                  <th>Publiceren</th>
                  <th>Acities</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(({ data, id }, i) => (
                  <tr key={id}>
                    <td className="font-bold">{getTeamNameById(data.teamId)}</td>
                    <td className="font-bold">{getOpponentNameById(data.opponentId)}</td>
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
          </>
        )}
      </OverviewCollection>
    </>
  )
}

MatchReportPage.Layout = 'root'
