import clsx from 'clsx'
import React, { MouseEventHandler, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  active?: boolean | undefined
}

export default function TextEditorButton({ children, onClick, active }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'text-editor-btn rounded  p-2',
        active ? 'bg-light' : 'bg-white hover:bg-light'
      )}
    >
      {children}
    </button>
  )
}
