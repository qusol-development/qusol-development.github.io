import React, { useRef, useState, useMemo } from 'react'
import JoditEditor from "jodit-react";

const Editor = ({ value, onChange }) => {
  const editor = useRef(null)
  const [content, setContent] = useState(value)
  const config = {
    showWordsCounter: false,
    showXPathInStatusbar: false,
    uploader: { insertImageAsBase64URI: true },
    buttons: "bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,paragraph,|,image,video,table,link,|,undo,redo,\n,selectall,cut,copy,paste,|,hr,symbol,fullsize",
    toolbarAdaptive:false
}
								
  return useMemo(() => ( 
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onChange={content => {
        setContent(content)
        onChange(content)
      }}
    /> 
  ), [])
}

export default Editor