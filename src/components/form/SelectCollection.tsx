import SelectInput from '@/components/form/SelectInput'
import useCollection from '@/hooks/useCollection'
import { BaseDocument } from '@/types/documents'
import React from 'react'

type Props<T, U> = {
  col: string
  def: any
  field: keyof U
  name: string
  onChange: (v: T) => void
  value: string
  className?: string | undefined
}

export default function SelectCollection<T extends BaseDocument<U>, U>({
  col,
  field,
  def,
  name,
  onChange,
  value,
  className,
}: Props<T, U>) {
  const [documents, error] = useCollection<T>(col)

  if (!documents || error) return <></>

  const createKeysAndValues = () => {
    const result = [{ key: def.id, value: def[field] }]
    result.push(...documents.map((doc) => ({ key: doc.id, value: doc.data[field] })))
    return result
  }

  return (
    <SelectInput
      name={name}
      value={value}
      onChange={(id) => {
        const doc = documents.find((doc) => doc.id === id)
        if (doc) onChange(doc)
      }}
      values={createKeysAndValues()}
      className={className}
    />
  )
}
