import DateInput from '@/components/form/DateInput'
import TextInput from '@/components/form/TextInput'
import { Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'

export default function DashboardPage() {
  const [text, setText] = useState('')
  const [timestamp, setTimestamp] = useState(Timestamp.now())

  return (
    <>
      <h1>Dashboard</h1>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <TextInput type="text" name="Naam" value={text} onChange={setText} />
        <TextInput type="email" name="Naam" value={text} onChange={setText} />
        <TextInput type="password" name="Naam" value={text} onChange={setText} />
        <DateInput name="Datum" value={timestamp} onChange={setTimestamp} />
      </div>
    </>
  )
}

DashboardPage.Layout = 'root'
