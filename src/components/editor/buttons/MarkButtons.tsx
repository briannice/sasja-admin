import TextEditorButton from '@/components/editor/TextEditorButton'
import TextEditorButtonGroup from '@/components/editor/TextEditorButtonGroup'
import { Editor } from '@tiptap/react'
import React, { useCallback } from 'react'
import { RiBold, RiItalic, RiLink, RiUnderline } from 'react-icons/ri'

type Props = {
  editor: Editor
}

export default function MarkButtons({ editor }: Props) {
  const isBold = editor.isActive('bold')
  const isItalic = editor.isActive('italic')
  const isUnderline = editor.isActive('underline')

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }

    editor.chain().focus().toggleLink({ href: url, target: '_blank' }).run()
  }, [editor])

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
      <TextEditorButton onClick={() => setLink()} active={isUnderline}>
        <RiLink />
      </TextEditorButton>
    </TextEditorButtonGroup>
  )
}
