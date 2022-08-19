import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import clsx from 'clsx'
import React from 'react'

type Props = {
  onChange: (v: string) => void
  value: string
  className?: string | undefined
}

export default function TextEditor({ onChange, value, className }: Props) {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
  })

  if (!editor) return <p>Loading</p>

  return (
    <div className={clsx('rounded border border-medium', className)}>
      <div></div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
