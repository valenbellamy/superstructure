import React, { useEffect } from "react"
import PropTypes from "prop-types"
import "../static/fonts/fonts.css"
import "../static/style/index.scss"

const Layout = ({ children }) => {
  useEffect(() => {
    document.body.style.visibility = "visible"
  }, [])
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
