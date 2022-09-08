import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import SwitchHandler from '@/components/SwitchHandler'
import useCollection from '@/hooks/useCollection'
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
import { timestampToString, timestampToTableString } from '@/utils/date'
import { FirestoreError } from 'firebase/firestore'
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

  return (
    <OverviewCollection<MatchReportDocument, MatchReportDocumentData>
      col={COL_MATCHREPORT}
      create={DOC_MATCHREPORT}
      name="Matchverslagen"
      errs={errors}
      loading={!teams || !opponents}
    >
      {({ deleteHandler, documents }) => (
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Tegenstander</th>
              <th>Datum</th>
              <th>Created</th>
              <th>Updated</th>
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
                  <time>{timestampToTableString(data.created)}</time>
                </td>
                <td>
                  <time>{timestampToTableString(data.updated)}</time>
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
                    url={`/matchverslagen/${id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </OverviewCollection>
  )
}

MatchReportPage.Layout = 'root'
