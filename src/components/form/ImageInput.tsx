import Loading from '@/components/Loading'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useState } from 'react'
import { RiImageLine } from 'react-icons/ri'

type Props = {
  id: string
  name: string
  path: string
  className?: string | undefined
}

export default function ImageInput({ id, name, path, className }: Props) {
  const [url, setUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className={clsx(className)}>
      <label htmlFor={name}>{name}</label>
      <div className="aspect-video rounded border border-medium p-4">
        <div className="relative flex h-full items-center justify-center">
          {isLoading ? (
            <Loading />
          ) : url ? (
            <Image src={url} alt="Image form" layout="fill" objectFit="contain" />
          ) : (
            <button type="button" className="btn btn-icon btn-gray">
              <RiImageLine />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
