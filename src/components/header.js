import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

//context
// import {
//   useGlobalDispatchContext,
//   useGlobalStateContext,
// } from "../context/globalContext"

const Header = ({ isShowingModal, toggleModal, backUrl, currentColor }) => {
  // const { currentColor } = useGlobalStateContext()
  return (
    <header>
      {!isShowingModal && (
        <nav>
          <button
            onClick={toggleModal}
            type="button"
            style={{ color: currentColor }}
          >
            infos
          </button>

          <Link
            to="/contact"
            style={{ color: currentColor }}
            state={{ backUrl: backUrl }}
          >
            contact
          </Link>
        </nav>
      )}
    </header>
  )
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
