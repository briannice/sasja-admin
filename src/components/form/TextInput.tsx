import clsx from 'clsx'
import React from 'react'

type Props = {
  name: string
  onChange: (v: string) => void
  type: 'email' | 'password' | 'text'
  value: string
  className?: string | undefined
}

export default function TextInput({ name, onChange, type, value, className }: Props) {
  return (
    <div className={clsx(className)}>
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
