import React from 'react'

export default function NotFoundPage() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-4">
      <p className="font-kanit text-4xl font-bold">404</p>
      <p className="font-kanit text-xl text-dark">Deze pagina lijkt niet te bestaan...</p>
    </div>
  )
}

NotFoundPage.Layout = 'root'
