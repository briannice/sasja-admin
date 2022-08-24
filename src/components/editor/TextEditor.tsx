import HistoryButtons from '@/components/editor/buttons/HistoryButtons'
import ListButtons from '@/components/editor/buttons/ListButtons'
import MarkButtons from '@/components/editor/buttons/MarkButtons'
import TableButtons from '@/components/editor/buttons/TableButtons'
import TextButtons from '@/components/editor/buttons/TextButtons'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
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
    extensions: [
      Bold,
      BulletList,
      Document,
      Heading.configure({ levels: [2, 3, 4] }),
      History,
      Italic,
      Link,
      ListItem,
      OrderedList,
      Paragraph,
      Strike,
      Table,
      TableCell.extend({ content: 'text*' }),
      TableHeader.extend({ content: 'text*' }),
      TableRow,
      Text,
      Underline,
    ],

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
      <div className="flex space-x-12 rounded px-8 py-4">
        <HistoryButtons editor={editor} />
        <TextButtons editor={editor} />
        <MarkButtons editor={editor} />
        <ListButtons editor={editor} />
        <TableButtons editor={editor} />
      </div>
      <div className="overflow-y-scroll">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
