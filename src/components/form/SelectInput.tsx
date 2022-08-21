import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import { RiCheckLine } from 'react-icons/ri'

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
          <span>{values.find((v) => v.key === value)?.value}</span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-30 mt-2 w-full rounded border border-primary bg-white p-1 ring-1 ring-primary focus:outline-none">
          {values.map(({ key, value }) => (
            <Listbox.Option
              key={key}
              value={key}
              className={({ active }) =>
                clsx(
                  'flex cursor-pointer items-center justify-between px-3 py-2 first:rounded-t last:rounded-b',
                  active ? 'bg-light' : 'bg-white'
                )
              }
            >
              {({ selected }) => (
                <>
                  <span>{value}</span>
                  {selected && <RiCheckLine />}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
