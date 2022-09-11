import ExternalLink from '@/components/ExternalLink'
import Link from '@/components/Link'
import Popup from '@/components/Popup'
import React, { useState } from 'react'
import { RiCloseLine, RiDeleteBinLine, RiEditLine, RiExternalLinkLine } from 'react-icons/ri'

type Props = {
  deleteHandler: (i: number) => void
  i: number
  url: string
}

export default function ActionButtons({ deleteHandler, i, url }: Props) {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <div className="flex items-center space-x-2">
        <ExternalLink href={url} className="btn btn-icon-sm btn-info">
          <RiExternalLinkLine />
        </ExternalLink>
        <Link href={url} className="btn btn-icon-sm btn-warning">
          <RiEditLine />
        </Link>
        <button onClick={() => setShowPopup(true)} className="btn btn-icon-sm btn-error">
          <RiDeleteBinLine />
        </button>
      </div>

      <Popup onClose={setShowPopup} open={showPopup} className="space-y-4">
        <p className="text-center font-kanit text-xl">Opgelet!</p>
        <p className="">Ben je zeker dat je het document wil verwijderen?</p>
        <button onClick={() => setShowPopup(false)} className="btn btn-gray btn-text-icon w-full">
          <span>Annuleren</span>
          <RiCloseLine />
        </button>
        <button
          onClick={() => {
            deleteHandler(i)
            setShowPopup(false)
          }}
          className="btn btn-primary btn-text-icon w-full"
        >
          <span>Verwijderen</span>
          <RiDeleteBinLine />
        </button>
      </Popup>
    </>
  )
}
