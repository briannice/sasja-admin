import DateInput from '@/components/form/DateInput'
import DateTimeInput from '@/components/form/DateTimeInput'
import SelectInput from '@/components/form/SelectInput'
import TextInput from '@/components/form/TextInput'
import { Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'

const vs = [
  { key: 'a', value: 'Haha' },
  { key: 'b', value: 'Hehe' },
  { key: 'c', value: 'Hoho' },
  { key: 'd', value: 'Hihi' },
  { key: 'e', value: 'Huhu' },
  { key: 'f', value: 'Hyhy' },
]

export default function DashboardPage() {
  const [text, setText] = useState('')
  const [timestamp, setTimestamp] = useState(Timestamp.now())
  const [v, setV] = useState(vs[0].key)

  return (
    <>
      <h1>Dashboard</h1>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <TextInput type="text" name="Naam" value={text} onChange={setText} />
        <TextInput type="email" name="Naam" value={text} onChange={setText} />
        <TextInput type="password" name="Naam" value={text} onChange={setText} />
        <DateInput name="Datum" value={timestamp} onChange={setTimestamp} />
        <DateTimeInput name="Datum" value={timestamp} onChange={setTimestamp} />
        <SelectInput name="SelectInput" values={vs} value={v} onChange={setV} />
      </div>
    </>
  )
}

DashboardPage.Layout = 'root'
