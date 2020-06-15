import { Link } from "gatsby"
import React from "react"

const Header = ({
  isShowingModal,
  toggleModal,
  currentColor,
  isVisible,
  backUrl,
}) => {
  return (
    <>
      {!isShowingModal && (
        <header>
          <nav className={`${isVisible ? "" : "--hidden"}`}>
            <button
              type="button"
              onClick={toggleModal}
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
        </header>
      )}
    </>
    // <header>
    //   {!isShowingModal && (
    //     <nav className={`${isVisible ? "" : "--hidden"}`}>
    //       <button
    //         onClick={toggleModal}
    //         type="button"
    //         style={{ color: currentColor }}
    //       >
    //         infos
    //       </button>

    //       <Link
    //         to="/contact"
    //         style={{ color: currentColor }}
    //         state={{ backUrl: backUrl }}
    //       >
    //         contact
    //       </Link>
    //     </nav>
    //   )}
    // </header>
  )
}

export default Header
