import TextEditor from '@/components/editor/TextEditor'
import DateInput from '@/components/form/DateInput'
import ImageInput from '@/components/form/ImageInput'
import NumberInput from '@/components/form/NumberInput'
import SelectCollection from '@/components/form/SelectCollection'
import SelectInput from '@/components/form/SelectInput'
import SelectOpponent from '@/components/form/SelectOpponent'
import SwitchInput from '@/components/form/SwitchInput'
import TextInput from '@/components/form/TextInput'
import EditDocument from '@/components/hoc/EditDocument'
import { COL_MATCHREPORT, COL_TEAMS, MATCHREPORT_TEAM_OBJECT } from '@/services/firebase/firestore'
import { MatchReportDocumentData, TeamDocument, TeamDocumentData } from '@/types/documents'
import Head from 'next/head'
import React from 'react'
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri'

const tags = [
  { key: 'COMPETITIE', value: 'Competitie' },
  { key: 'BEKER', value: 'Beker' },
  { key: 'VRIENDSCHAPPELIJK', value: 'Vriendschappelijk' },
]

export default function MatchReportEditPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Matchverslagen</title>
      </Head>
      <EditDocument<MatchReportDocumentData> col={COL_MATCHREPORT} name="Matchverslag">
        {({ document, id, setDocument }) => (
          <>
            <SelectCollection<TeamDocument, TeamDocumentData>
              col={COL_TEAMS}
              def={MATCHREPORT_TEAM_OBJECT}
              field="name"
              name="Team"
              value={document.team.id}
              onChange={(v) => setDocument({ ...document, team: { id: v.id, name: v.data.name } })}
            />
            <SelectOpponent
              value={document.opponent}
              onChange={(v) => setDocument({ ...document, opponent: v })}
            />
            <div className="grid grid-cols-2 gap-8">
              <SelectInput
                name="tag"
                values={tags}
                value={document.tag}
                onChange={(v) => setDocument({ ...document, tag: v })}
                className="col-span-2"
              />
              <DateInput
                name="Datum"
                value={document.time}
                onChange={(v) => setDocument({ ...document, time: v })}
                className="col-span-2"
              />
              <TextInput
                type="text"
                name="Auteur"
                value={document.writer}
                onChange={(v) => setDocument({ ...document, writer: v })}
                className="col-span-2"
              />
              <SwitchInput
                name="Thuis"
                value={document.home}
                onChange={(v) => setDocument({ ...document, home: v })}
              />
              <SwitchInput
                name="Publiceren"
                value={document.public}
                onChange={(v) => setDocument({ ...document, public: v })}
              />
            </div>
            <ImageInput id={id} name="Banner" path={COL_MATCHREPORT} />

            <div className="col-span-2">
              <div className="flex items-center justify-between border-y border-t-primary border-b-medium pt-8 pb-4">
                <p className="font-kanit text-xl text-dark">Scores</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setDocument({
                      ...document,
                      score: [...document.score, { sasja: 0, opponent: 0 }],
                    })
                  }}
                  className="btn btn-icon btn-primary"
                >
                  <RiAddLine />
                </button>
              </div>
              <div className="mt-8 space-y-8">
                {document.score.map(({ sasja, opponent }, i) => (
                  <div key={i} className="flex items-end space-x-8">
                    <NumberInput
                      name="Sasja"
                      value={sasja}
                      onChange={(v) => {
                        const scoreCopy = [...document.score]
                        scoreCopy[i].sasja = v
                        setDocument({ ...document, score: scoreCopy })
                      }}
                      className="flex-1"
                    />
                    <NumberInput
                      name="Tegenstander"
                      value={opponent}
                      onChange={(v) => {
                        const scoreCopy = [...document.score]
                        scoreCopy[i].opponent = v
                        setDocument({ ...document, score: scoreCopy })
                      }}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        const scoreCopy = [...document.score]
                        scoreCopy.splice(i, 1)
                        setDocument({ ...document, score: scoreCopy })
                      }}
                      className="btn btn-icon btn-primary mb-1.5"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <TextEditor
              value={document.content}
              onChange={(v) => setDocument({ ...document, content: v })}
              className="col-span-2 border-t border-primary pt-8"
            />
          </>
        )}
      </EditDocument>
    </>
  )
}

MatchReportEditPage.Layout = 'root'
