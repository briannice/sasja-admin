import { auth } from '@/services/firebase'
import Image from 'next/image'
import React from 'react'
import { RiUserLine } from 'react-icons/ri'

export default function Header() {
  return (
    <header className="col-span-2 flex items-center rounded-lg bg-white px-8 shadow">
      <figure className="relative aspect-square h-4/5">
        <Image src="/logo.png" alt="Logo Sasja HC." layout="fill" objectFit="contain" />
      </figure>
      <span className="ml-8 font-kanit text-2xl">Sasja Admin</span>

      {auth.currentUser && (
        <>
          <span className="ml-auto font-bold">{auth.currentUser.email}</span>
          <figure className="relative ml-4 aspect-square h-3/5 overflow-hidden rounded-full">
            {auth.currentUser.photoURL ? (
              <Image
                src={auth.currentUser.photoURL}
                alt="User profile picture."
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-light">
                <RiUserLine className="h-6 w-6 text-gray" />
              </div>
            )}
          </figure>
        </>
      )}
    </header>
  )
}
