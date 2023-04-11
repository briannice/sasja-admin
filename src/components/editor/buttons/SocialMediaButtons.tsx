import React from 'react'
import TextEditorButton from '@/components/editor/TextEditorButton'
import TextEditorButtonGroup from '@/components/editor/TextEditorButtonGroup'
import { Editor } from '@tiptap/react'
import { RiYoutubeLine } from 'react-icons/ri'

type Props = {
  editor: Editor
}

export default function SocialMediaButtons({ editor }: Props) {
  const addYouTubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      })
    }
  }

  return (
    <TextEditorButtonGroup>
      <TextEditorButton onClick={() => addYouTubeVideo()}>
        <RiYoutubeLine />
      </TextEditorButton>
    </TextEditorButtonGroup>
  )
}
