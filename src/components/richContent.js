import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"

const RichContent = ({ contenu, currentColor }) => {
  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: node => {
        return (
          <a
            href={node.data.uri}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: currentColor, textTransform: "uppercase" }}
            onClick={e => e.stopPropagation()}
          >
            {node.content[0].value}
          </a>
        )
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p style={{ color: currentColor }}>{children}</p>
      },
    },
  }
  return (
    <div className="content__rich" style={{ color: currentColor }}>
      {documentToReactComponents(contenu.json, options)}
    </div>
  )
}

export default RichContent
