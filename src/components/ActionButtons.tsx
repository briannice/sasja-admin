import Link from '@/components/Link'
import React from 'react'
import { RiDeleteBinLine, RiEditLine, RiExternalLinkLine } from 'react-icons/ri'

type Props = {
  edit: string
  view: string
}

export default function ActionButtons({ edit, view }: Props) {
  return (
    <div className="flex space-x-2">
      <Link href={view} className="btn btn-icon-sm btn-info">
        <RiExternalLinkLine />
      </Link>
      <Link href={edit} className="btn btn-icon-sm btn-warning">
        <RiEditLine />
      </Link>
      <Link href={edit} className="btn btn-icon-sm btn-error aspect-square">
        <RiDeleteBinLine />
      </Link>
    </div>
  )
}
