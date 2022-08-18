import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

type Props = {
  name: string
  onChange: (v: string) => void
  value: string
  values: { key: string; value: string }[]
  className?: string | undefined
}

export default function SelectInput({ name, onChange, value, values, className }: Props) {
  return (
    <div className={clsx('relative', className)}>
      <label htmlFor={name}>{name}</label>
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className="input form-select text-left">
          <span>{value}</span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-2 w-full rounded border border-primary bg-white p-1 ring-1 ring-primary focus:outline-none">
          {values.map(({ key, value }) => (
            <Listbox.Option key={key} value={key}>
              <span>{value}</span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
