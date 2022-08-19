import TextEditorButton from '@/components/editor/TextEditorButton'
import TextEditorButtonGroup from '@/components/editor/TextEditorButtonGroup'
import { Editor } from '@tiptap/react'
import React from 'react'
import { RiBold, RiItalic, RiUnderline } from 'react-icons/ri'

type Props = {
  editor: Editor
}

export default function MarkButtons({ editor }: Props) {
  const isBold = editor.isActive('bold')
  const isItalic = editor.isActive('italic')
  const isUnderline = editor.isActive('underline')

  return (
    <TextEditorButtonGroup>
      <TextEditorButton onClick={() => editor.chain().focus().toggleBold().run()} active={isBold}>
        <RiBold />
      </TextEditorButton>
      <TextEditorButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={isItalic}
      >
        <RiItalic />
      </TextEditorButton>
      <TextEditorButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={isUnderline}
      >
        <RiUnderline />
      </TextEditorButton>
    </TextEditorButtonGroup>
  )
}
