import ImageInput from '@/components/form/ImageInput'
import NumberInput from '@/components/form/NumberInput'
import SwitchInput from '@/components/form/SwitchInput'
import TextInput from '@/components/form/TextInput'
import EditDocument from '@/components/hoc/EditDocument'
import { COL_TEAMS } from '@/services/firebase/firestore'
import { TeamDocumentData } from '@/types/documents'
import Head from 'next/head'
import React from 'react'
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri'

export default function TeamEditPage() {
  const isAdmin = false

  return (
    <>
      <Head>
        <title>Sasja Admin | Teams</title>
      </Head>
      <EditDocument<TeamDocumentData> col={COL_TEAMS} name="Team">
        {({ document, id, setDocument }) => (
          <>
            {isAdmin ? (
              <div className="space-y-8">
                <TextInput
                  type="text"
                  name="Naam"
                  value={document.name}
                  onChange={(v) => setDocument({ ...document, name: v })}
                />
                <TextInput
                  type="text"
                  name="UID"
                  value={id}
                  onChange={() => setDocument({ ...document })}
                />
                <SwitchInput
                  name="Jeugd"
                  value={document.youth}
                  onChange={(v) => setDocument({ ...document, youth: v })}
                />
              </div>
            ) : (
              <div>
                <label>Naam</label>
                <p className="input form-input">{document.name}</p>
                <label className="mt-8">UID</label>
                <p className="input form-input">{id}</p>
              </div>
            )}

            <ImageInput id={id} name="Ploegfoto" path={COL_TEAMS} />

            <div className="col-span-2">
              <div className="flex items-center justify-between border-y border-b-medium border-t-primary pb-4 pt-8">
                <p className="font-kanit text-xl text-dark">Competities</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    const newCompetition = { name: '', serieId: 0, vhvId: 0 }
                    setDocument({
                      ...document,
                      competitions: [...document.competitions, newCompetition],
                    })
                  }}
                  className="btn btn-icon btn-primary"
                >
                  <RiAddLine />
                </button>
              </div>
              <div className="mt-8 space-y-8">
                {document.competitions.map((competition, i) => (
                  <div key={i} className="flex items-end space-x-8">
                    <TextInput
                      type="text"
                      name="Naam"
                      value={competition.name}
                      onChange={(v) => {
                        const competitionsCopy = [...document.competitions]
                        competitionsCopy[i].name = v
                        setDocument({ ...document, competitions: competitionsCopy })
                      }}
                      className="flex-1"
                    />
                    <NumberInput
                      name="Serie ID"
                      value={competition.serieId}
                      onChange={(v) => {
                        const competitionsCopy = [...document.competitions]
                        competitionsCopy[i].serieId = v
                        setDocument({ ...document, competitions: competitionsCopy })
                      }}
                      className="flex-1"
                    />
                    <NumberInput
                      name="VHV ID"
                      value={competition.vhvId}
                      onChange={(v) => {
                        const competitionsCopy = [...document.competitions]
                        competitionsCopy[i].vhvId = v
                        setDocument({ ...document, competitions: competitionsCopy })
                      }}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        const newCompetitions = [...document.competitions]
                        newCompetitions.splice(i, 1)
                        setDocument({ ...document, competitions: newCompetitions })
                      }}
                      className="btn btn-icon btn-primary mb-1.5"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </EditDocument>
    </>
  )
}

TeamEditPage.Layout = 'root'
