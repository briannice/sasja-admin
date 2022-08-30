import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

type Props = {
  name: string
  onChange: (v: boolean) => void
  value: boolean
  className?: string | undefined
}

export default function SwitchInput({ name, onChange, value, className }: Props) {
  return (
    <div className={clsx(className)}>
      <label htmlFor={name}>{name}</label>
      <Switch
        checked={value}
        onChange={onChange}
        className={clsx(
          'relative h-6 w-14 cursor-pointer rounded-full transition-colors focus:outline-none',
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
