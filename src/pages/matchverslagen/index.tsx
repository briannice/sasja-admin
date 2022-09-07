import ActionButtons from '@/components/ActionButtons'
import OverviewCollection from '@/components/hoc/OverviewCollection'
import Loading from '@/components/Loading'
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
import React from 'react'

export default function MatchReportPage() {
  const [teams, errorTeams] = useCollection<TeamDocument>(COL_TEAMS)
  const [opponents, errorOpponents] = useCollection<OpponentDocument>(COL_OPPONENTS)

  if (!teams || !opponents) return <Loading />

  const getTeamNameById = (id: string) => {
    const index = teams.findIndex((team) => team.id === id)
    if (index === -1) return ''
    return teams[index].data.name
  }

  const getOpponentNameById = (id: string) => {
    const index = opponents.findIndex((opponent) => opponent.id === id)
    if (index === -1) return ''
    return opponents[index].data.name
  }

  return (
    <OverviewCollection<MatchReportDocument, MatchReportDocumentData>
      col={COL_MATCHREPORT}
      create={DOC_MATCHREPORT}
      name="Matchverslagen"
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
                <td>{getTeamNameById(data.teamId)}</td>
                <td>{getOpponentNameById(data.opponentId)}</td>
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
