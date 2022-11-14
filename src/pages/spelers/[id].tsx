import TextEditor from '@/components/editor/TextEditor'
import DateInput from '@/components/form/DateInput'
import ImageInput from '@/components/form/ImageInput'
import NumberInput from '@/components/form/NumberInput'
import SelectCollection from '@/components/form/SelectCollection'
import SwitchInput from '@/components/form/SwitchInput'
import TextInput from '@/components/form/TextInput'
import EditDocument from '@/components/hoc/EditDocument'
import { COL_PLAYERS, COL_TEAMS, PLAYER_TEAM_OBJECT } from '@/services/firebase/firestore'
import { PlayerDocumentData, TeamDocument, TeamDocumentData } from '@/types/documents'
import Head from 'next/head'
import React from 'react'

export default function PlayerEditPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Spelers</title>
      </Head>
      <EditDocument<PlayerDocumentData> col={COL_PLAYERS} name="Speler">
        {({ document, id, setDocument }) => (
          <>
            <TextInput
              type="text"
              name="Voornaam"
              value={document.firstname}
              onChange={(v) => setDocument({ ...document, firstname: v })}
            />
            <TextInput
              type="text"
              name="Achternaam"
              value={document.lastname}
              onChange={(v) => setDocument({ ...document, lastname: v })}
            />
            <div className="space-y-8">
              <NumberInput
                name="Rugnummer"
                value={document.backNumber}
                onChange={(v) => setDocument({ ...document, backNumber: v })}
              />
              <DateInput
                name="Geboortedatum"
                value={document.birthday}
                onChange={(v) => setDocument({ ...document, birthday: v })}
              />
              <DateInput
                name="Inschrijvingsdatum"
                value={document.registration}
                onChange={(v) => setDocument({ ...document, registration: v })}
              />
              <SelectCollection<TeamDocument, TeamDocumentData>
                col={COL_TEAMS}
                def={PLAYER_TEAM_OBJECT}
                field="name"
                name="Team"
                value={document.team.id}
                onChange={(v) =>
                  setDocument({ ...document, team: { id: v.id, name: v.data.name } })
                }
              />
              <SwitchInput
                name="Publiceren"
                value={document.public}
                onChange={(v) => setDocument({ ...document, public: v })}
              />
            </div>
            <ImageInput id={id} name="Foto" path={COL_PLAYERS} />
            <TextEditor
              value={document.description}
              onChange={(v) => setDocument({ ...document, description: v })}
              className="col-span-2"
            />
          </>
        )}
      </EditDocument>
    </>
  )
}

PlayerEditPage.Layout = 'root'
