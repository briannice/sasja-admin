import TextButtons from '@/components/editor/buttons/TextButtons'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
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
    extensions: [Document, Heading.configure({ levels: [2, 3, 4] }), Paragraph, Text],

    content: value,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      console.log(html)
      onChange(html)
    },

    editorProps: {
      attributes: {
        class: 'focus:outline-none h-[600px] p-8 text-editor',
      },
    },
  })

  if (!editor) return <p>Loading</p>

  return (
    <div className={clsx('divide-y divide-medium rounded border border-medium', className)}>
      <div className="flex space-x-8 rounded px-8 py-4">
        <TextButtons editor={editor} />
      </div>
      <div className="overflow-y-scroll">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
