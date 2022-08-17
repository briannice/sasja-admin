import TextInput from '@/components/form/TextInput'
import React, { useState } from 'react'

export default function DashboardPage() {
  const [text, setText] = useState('')

  return (
    <>
      <h1>Dashboard</h1>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <TextInput type="text" name="Naam" value={text} onChange={setText} />
        <TextInput type="email" name="Naam" value={text} onChange={setText} />
        <TextInput type="password" name="Naam" value={text} onChange={setText} />
      </div>
    </>
  )
}

DashboardPage.Layout = 'root'
