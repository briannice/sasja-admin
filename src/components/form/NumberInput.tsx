import clsx from 'clsx'
import React from 'react'

type Props = {
  name: string
  onChange: (v: number) => void
  value: number
  className?: string | undefined
}

export default function NumberInput({ name, onChange, value, className }: Props) {
  return (
    <div className={clsx(className)}>
      <label htmlFor={name}>{name}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  )
}
