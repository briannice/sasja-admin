import TextInput from '@/components/form/TextInput'
import EditDocumentLayout from '@/components/layout/EditDocumentLayout'
import { EventDocumentData } from '@/types/documents'
import React from 'react'

export default function EventEditPage() {
  return (
    <EditDocumentLayout<EventDocumentData> col="events" name="Evenement">
      {({ document, setDocument }) => (
        <>
          <TextInput
            type="text"
            name="naam"
            value={document.name}
            onChange={(v) => setDocument({ ...document, name: v })}
          />
        </>
      )}
    </EditDocumentLayout>
  )
}

EventEditPage.Layout = 'root'
