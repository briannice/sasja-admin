import { db } from '@/services/firebase'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'

type Props = {
  col: string
  id: string
  initial: boolean
  name: string
}

export default function SwitchHandler({ col, id, initial, name }: Props) {
  const [value, setValue] = useState(initial)

  const onChange = () => {
    updateDoc(doc(db, col, id), { [name]: !value }).then(() => setValue(!value))
  }

  return (
    <div>
      <Switch
        checked={value}
        onChange={onChange}
        className={clsx(
          'relative h-6 w-14 cursor-pointer rounded-full transition-colors',
          value ? 'bg-primary' : 'bg-medium'
        )}
      >
        <span
          className={clsx(
            'absolute inset-y-1 left-1 aspect-square rounded-full bg-white transition-transform',
            value ? 'translate-x-8' : 'translate-y-0'
          )}
        />
      </Switch>
    </div>
  )
}
