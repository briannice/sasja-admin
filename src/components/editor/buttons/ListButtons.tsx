import TextEditorButton from '@/components/editor/TextEditorButton'
import TextEditorButtonGroup from '@/components/editor/TextEditorButtonGroup'
import { Editor } from '@tiptap/react'
import React from 'react'
import { RiListOrdered, RiListUnordered } from 'react-icons/ri'

type Props = {
  editor: Editor
}

export default function ListButtons({ editor }: Props) {
  const isBulletList = editor.isActive('bulletList')
  const isOrderedList = editor.isActive('orderedList')

  return (
    <TextEditorButtonGroup>
      <TextEditorButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={isOrderedList}
      >
        <RiListOrdered />
      </TextEditorButton>
      <TextEditorButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={isBulletList}
      >
        <RiListUnordered />
      </TextEditorButton>
    </TextEditorButtonGroup>
  )
}
