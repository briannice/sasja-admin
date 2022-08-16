import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <header className="col-span-2 flex items-center rounded-lg bg-white px-8 shadow">
      <figure className="relative aspect-square h-4/5">
        <Image src="/logo.png" alt="Logo Sasja HC." layout="fill" objectFit="contain" />
      </figure>
      <span className="ml-8 font-kanit text-2xl">Sasja Admin</span>

      <span className="ml-auto font-bold">brian.nys.dev@gmail.com</span>
      <figure className="relative ml-4 aspect-square h-3/5 overflow-hidden rounded-full">
        <Image src="/user.jpg" alt="User profile picture." layout="fill" objectFit="cover" />
      </figure>
    </header>
  )
}
