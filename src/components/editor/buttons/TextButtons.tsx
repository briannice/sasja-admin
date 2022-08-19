import TextEditorButton from '@/components/editor/TextEditorButton'
import TextEditorButtonGroup from '@/components/editor/TextEditorButtonGroup'
import { Editor } from '@tiptap/react'
import React from 'react'
import { RiH1, RiH2, RiH3, RiText } from 'react-icons/ri'

type Props = {
  editor: Editor
}

export default function TextButtons({ editor }: Props) {
  const isParagraph = editor.isActive('paragraph')
  const isHeading2 = editor.isActive('heading', { level: 2 })
  const isHeading3 = editor.isActive('heading', { level: 3 })
  const isHeading4 = editor.isActive('heading', { level: 4 })

  return (
    <TextEditorButtonGroup>
      <TextEditorButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        active={isParagraph}
      >
        <RiText />
      </TextEditorButton>
      <TextEditorButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={isHeading2}
      >
        <RiH1 />
      </TextEditorButton>
      <TextEditorButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={isHeading3}
      >
        <RiH2 />
      </TextEditorButton>
      <TextEditorButton
        onClick={() => editor.chain().focus().setHeading({ level: 4 }).run()}
        active={isHeading4}
      >
        <RiH3 />
      </TextEditorButton>
    </TextEditorButtonGroup>
  )
}
