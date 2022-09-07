import ImageInput from '@/components/form/ImageInput'
import SelectCollection from '@/components/form/SelectCollection'
import SelectInput from '@/components/form/SelectInput'
import TextInput from '@/components/form/TextInput'
import EditDocument from '@/components/hoc/EditDocument'
import { COL_MATCHREPORT, COL_TEAMS, FK_TEAMS } from '@/services/firebase/firestore'
import { MatchReportDocumentData } from '@/types/documents'
import React from 'react'

const tags = [
  { key: 'COMPETITIE', value: 'Competitie' },
  { key: 'BEKER', value: 'Beker' },
  { key: 'VRIENDSCHAPPELIJK', value: 'Vriendschappelijk' },
]

export default function MatchReportEditPage() {
  return (
    <EditDocument<MatchReportDocumentData> col={COL_MATCHREPORT} name="Matchverslag">
      {({ document, id, setDocument }) => (
        <>
          <div className="space-y-8">
            <TextInput
              name="Score"
              type="text"
              value={document.score}
              onChange={(v) => setDocument({ ...document, score: v })}
            />
            <SelectInput
              name="tag"
              values={tags}
              value={document.tag}
              onChange={(v) => setDocument({ ...document, tag: v })}
            />
            <SelectCollection
              col={COL_TEAMS}
              def={FK_TEAMS}
              field="name"
              name="Team"
              value={document.teamId}
              onChange={(v) => setDocument({ ...document, teamId: v })}
            />
          </div>
          <ImageInput id={id} name="Banner" path={COL_MATCHREPORT} />
        </>
      )}
    </EditDocument>
  )
}

MatchReportEditPage.Layout = 'root'
