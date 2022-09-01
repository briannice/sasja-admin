import ExternalLink from '@/components/ExternalLink'
import Link from '@/components/Link'
import React from 'react'
import { RiDeleteBinLine, RiEditLine, RiExternalLinkLine } from 'react-icons/ri'

type Props = {
  deleteHandler: (i: number) => void
  i: number
  url: string
}

export default function ActionButtons({ deleteHandler, i, url }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <ExternalLink href={url} className="btn btn-icon-sm btn-info">
        <RiExternalLinkLine />
      </ExternalLink>
      <Link href={url} className="btn btn-icon-sm btn-warning">
        <RiEditLine />
      </Link>
      <button onClick={() => deleteHandler(i)} className="btn btn-icon-sm btn-error aspect-square">
        <RiDeleteBinLine />
      </button>
    </div>
  )
}
