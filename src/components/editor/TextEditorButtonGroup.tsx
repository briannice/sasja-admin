import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function TextEditorButtonGroup({ children }: Props) {
  return <div className="flex space-x-2">{children}</div>
}
