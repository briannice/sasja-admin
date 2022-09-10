import TextEditor from '@/components/editor/TextEditor'
import DateInput from '@/components/form/DateInput'
import ImageInput from '@/components/form/ImageInput'
import SelectInput from '@/components/form/SelectInput'
import SwitchInput from '@/components/form/SwitchInput'
import TextInput from '@/components/form/TextInput'
import EditDocument from '@/components/hoc/EditDocument'
import { COL_NEWS } from '@/services/firebase/firestore'
import { NewsDocumentData } from '@/types/documents'
import Head from 'next/head'
import React from 'react'

const tags = [
  { key: 'CLUB', value: 'CLUB' },
  { key: 'TRANSFER', value: 'TRANSFER' },
  { key: 'KERN', value: 'KERN' },
  { key: 'JEUGD', value: 'JEUGD' },
]

export default function NewsEditPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Nieuws</title>
      </Head>
      <EditDocument<NewsDocumentData> col={COL_NEWS} name="Nieuws">
        {({ document, id, setDocument }) => (
          <>
            <TextInput
              type="text"
              name="title"
              value={document.title}
              onChange={(v) => setDocument({ ...document, title: v })}
              className="col-span-2"
            />
            <div className="grid grid-cols-2 place-content-start gap-8">
              <DateInput
                name="Datum"
                value={document.time}
                onChange={(v) => setDocument({ ...document, time: v })}
                className="col-span-2"
              />
              <SelectInput
                name="tag"
                values={tags}
                value={document.tag}
                onChange={(v) => setDocument({ ...document, tag: v })}
                className="col-span-2"
              />
              <SwitchInput
                name="publiceren"
                value={document.public}
                onChange={(v) => setDocument({ ...document, public: v })}
              />
              <SwitchInput
                name="pinnen"
                value={document.pinned}
                onChange={(v) => setDocument({ ...document, pinned: v })}
              />
            </div>
            <ImageInput id={id} name="banner" path={COL_NEWS} />
            <TextEditor
              value={document.content}
              onChange={(v) => setDocument({ ...document, content: v })}
              className="col-span-2"
            />
          </>
        )}
      </EditDocument>
    </>
  )
}

NewsEditPage.Layout = 'root'
