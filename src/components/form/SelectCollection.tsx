import SelectInput from '@/components/form/SelectInput'
import { db } from '@/services/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type Props = {
  col: string
  def: string
  field: string
  name: string
  onChange: (v: string) => void
  value: string
}

export default function SelectCollection({ col, def, field, name, onChange, value }: Props) {
  const [values, setValues] = useState<{ key: string; value: string }[] | null>(null)

  useEffect(() => {
    getDocs(query(collection(db, col), orderBy(field, 'asc')))
      .then((docs) => {
        const result = [{ key: def, value: def }]
        result.push(...docs.docs.map((doc) => ({ key: doc.id, value: doc.data()[field] })))
        setValues(result)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [col, def, field])

  if (!values) return <></>

  return <SelectInput name={name} value={value} onChange={onChange} values={values} />
}
