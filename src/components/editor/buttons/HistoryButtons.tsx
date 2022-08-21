import TextEditorButton from '@/components/editor/TextEditorButton'
import TextEditorButtonGroup from '@/components/editor/TextEditorButtonGroup'
import { Editor } from '@tiptap/react'
import React from 'react'
import { RiArrowGoBackLine, RiArrowGoForwardLine } from 'react-icons/ri'

type Props = {
  editor: Editor
}

export default function HistoryButtons({ editor }: Props) {
  return (
    <TextEditorButtonGroup>
      <TextEditorButton onClick={() => editor.chain().focus().undo().run()}>
        <RiArrowGoBackLine />
      </TextEditorButton>

      <TextEditorButton onClick={() => editor.chain().focus().redo().run()}>
        <RiArrowGoForwardLine />
      </TextEditorButton>
    </TextEditorButtonGroup>
  )
}
