import { timestampToString } from '@/utils/date'
import clsx from 'clsx'
import { Timestamp } from 'firebase/firestore'
import React, { ChangeEventHandler } from 'react'

type Props = {
  name: string
  onChange: (v: Timestamp) => void
  value: Timestamp
  className?: string | undefined
}

export default function DateTimeInput({ name, onChange, value, className }: Props) {
  const inputValue = timestampToString(value, 'YYYY-MM-DDTHH:mm')

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = new Date(e.target.value)
    const timestamp = Timestamp.fromDate(date)
    onChange(timestamp)
  }

  return (
    <div className={clsx(className)}>
      <label htmlFor={name}>{name}</label>
      <input
        type="datetime-local"
        id={name}
        name={name}
        value={inputValue}
        onChange={onChangeHandler}
      />
    </div>
  )
}
