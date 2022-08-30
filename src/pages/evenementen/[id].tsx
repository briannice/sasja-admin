import TextEditor from '@/components/editor/TextEditor'
import DateTimeInput from '@/components/form/DateTimeInput'
import ImageInput from '@/components/form/ImageInput'
import SwitchInput from '@/components/form/SwitchInput'
import TextInput from '@/components/form/TextInput'
import EditDocument from '@/components/hoc/EditDocument'
import { EventDocumentData } from '@/types/documents'
import React from 'react'

export default function EventEditPage() {
  return (
    <EditDocument<EventDocumentData> col="events" name="Evenement">
      {({ document, id, setDocument }) => (
        <>
          <TextInput
            type="text"
            name="naam"
            value={document.name}
            onChange={(v) => setDocument({ ...document, name: v })}
            className="col-span-2"
          />
          <div className="space-y-8">
            <DateTimeInput
              name="Tijd"
              value={document.time}
              onChange={(v) => setDocument({ ...document, time: v })}
            />
            <TextInput
              type="text"
              name="locatie"
              value={document.location}
              onChange={(v) => setDocument({ ...document, location: v })}
            />
            <TextInput
              type="text"
              name="adres"
              value={document.address}
              onChange={(v) => setDocument({ ...document, address: v })}
            />
            <SwitchInput
              name="publiceren"
              value={document.public}
              onChange={(v) => setDocument({ ...document, public: v })}
            />
          </div>
          <ImageInput id={id} name="Banner" path="events" />
          <TextEditor
            value={document.content}
            onChange={(v) => setDocument({ ...document, content: v })}
            className="col-span-2"
          />
        </>
      )}
    </EditDocument>
  )
}

EventEditPage.Layout = 'root'
