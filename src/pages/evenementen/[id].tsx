import TextEditor from '@/components/editor/TextEditor'
import DateTimeInput from '@/components/form/DateTimeInput'
import TextInput from '@/components/form/TextInput'
import EditDocumentLayout from '@/components/layout/EditDocumentLayout'
import { EventDocumentData } from '@/types/documents'
import React from 'react'

export default function EventEditPage() {
  return (
    <EditDocumentLayout<EventDocumentData> col="events" name="Evenement">
      {({ document, setDocument }) => (
        <>
          <div className="space-y-8">
            <TextInput
              type="text"
              name="naam"
              value={document.name}
              onChange={(v) => setDocument({ ...document, name: v })}
            />
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
          </div>
          <TextEditor
            value={document.content}
            onChange={(v) => setDocument({ ...document, content: v })}
            className="col-span-2"
          />
        </>
      )}
    </EditDocumentLayout>
  )
}

EventEditPage.Layout = 'root'
