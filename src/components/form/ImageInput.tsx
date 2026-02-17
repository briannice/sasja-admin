import Loading from '@/components/Loading'
import { createImage, deleteImage, downloadImage } from '@/services/firebase/storage'
import clsx from 'clsx'
import Image from 'next/image'
import React, { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { RiDeleteBinLine, RiImageLine } from 'react-icons/ri'

type Props = {
  id: string
  name: string
  path: string
  className?: string | undefined
}

export default function ImageInput({ id, name, path, className }: Props) {
  const [url, setUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const imageInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    downloadImage(`/${path}/${id}`, 'small')
      .then((url) => setUrl(url))
      .catch(() => setIsLoading(true))
      .finally(() => setIsLoading(false))
  }, [path, id])

  const deleteImageHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    deleteImage(`/${path}/${id}`)
      .then(() => setUrl(null))
      .catch(() => console.error('Failed to delete image...'))
      .finally(() => setIsLoading(false))
  }

  const addImageHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const reader = new FileReader()
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0])
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const image = e.target.result as string

          createImage(`/${path}/${id}`, image)
            .then(() => {
              setTimeout(async () => {
                const url = await downloadImage(`/${path}/${id}`, 'small')
                setUrl(url)
                setIsLoading(false)
              }, 8000)
            })
            .catch(() => setIsLoading(false))
        }
      }
    }
  }

  return (
    <div className={clsx(className)}>
      <label htmlFor={name}>{name}</label>
      <input
        type="file"
        name={name}
        id={name}
        ref={imageInputRef}
        onChange={addImageHandler}
        className="hidden"
      />
      <div className="aspect-video rounded border border-medium p-4">
        <div className="relative flex h-full items-center justify-center">
          {isLoading ? (
            <Loading />
          ) : url ? (
            <>
              <Image src={url} alt="Image form" fill style={{ objectFit: 'contain' }} />
              <button
                type="button"
                onClick={deleteImageHandler}
                className="btn btn-icon btn-primary absolute right-0 top-0"
              >
                <RiDeleteBinLine />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => imageInputRef.current && imageInputRef.current.click()}
              className="btn btn-icon btn-gray"
            >
              <RiImageLine />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
