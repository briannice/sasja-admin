import TextEditorButton from '@/components/editor/TextEditorButton'
import TextEditorButtonGroup from '@/components/editor/TextEditorButtonGroup'
import { Editor } from '@tiptap/react'
import React from 'react'
import {
  RiDeleteColumn,
  RiDeleteRow,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowBottom,
  RiInsertRowTop,
  RiMergeCellsHorizontal,
  RiTable2,
  RiTableLine,
} from 'react-icons/ri'

type Props = {
  editor: Editor
}

export default function TableButtons({ editor }: Props) {
  const tableHTML = `
  <table>
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
  </table>
  <p />
`

  return (
    <TextEditorButtonGroup>
      <TextEditorButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertContent(tableHTML, {
              parseOptions: {
                preserveWhitespace: false,
              },
            })
            .run()
        }
      >
        <RiTable2 />
      </TextEditorButton>

      <TextEditorButton onClick={() => editor.chain().focus().addRowBefore().run()}>
        <RiInsertRowTop />
      </TextEditorButton>

      <TextEditorButton onClick={() => editor.chain().focus().addRowAfter().run()}>
        <RiInsertRowBottom />
      </TextEditorButton>

      <TextEditorButton onClick={() => editor.chain().focus().addColumnBefore().run()}>
        <RiInsertColumnLeft />
      </TextEditorButton>

      <TextEditorButton onClick={() => editor.chain().focus().addColumnAfter().run()}>
        <RiInsertColumnRight />
      </TextEditorButton>

      <TextEditorButton onClick={() => editor.chain().focus().deleteRow().run()}>
        <RiDeleteRow />
      </TextEditorButton>

      <TextEditorButton onClick={() => editor.chain().focus().deleteColumn().run()}>
        <RiDeleteColumn />
      </TextEditorButton>
    </TextEditorButtonGroup>
  )
}
