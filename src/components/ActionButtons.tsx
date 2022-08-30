import ExternalLink from '@/components/ExternalLink'
import Link from '@/components/Link'
import React from 'react'
import { RiDeleteBinLine, RiEditLine, RiExternalLinkLine } from 'react-icons/ri'

type Props = {
  url: string
}

export default function ActionButtons({ url }: Props) {
  return (
    <div className="flex space-x-2">
      <ExternalLink href={url} className="btn btn-icon-sm btn-info">
        <RiExternalLinkLine />
      </ExternalLink>
      <Link href={url} className="btn btn-icon-sm btn-warning">
        <RiEditLine />
      </Link>
      <Link href={url} className="btn btn-icon-sm btn-error aspect-square">
        <RiDeleteBinLine />
      </Link>
    </div>
  )
}
