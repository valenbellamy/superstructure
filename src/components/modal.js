import React from "react"
import ReactDOM from "react-dom"
import Img from "gatsby-image"
import Logo from "./logo"
import { Link } from "gatsby"

const Modal = ({
  isShowingModal,
  toggleModal,
  content,
  currentColor,
  backUrl,
}) => {
  return (
    <>
      {isShowingModal && (
        <>
          <div className={`modal-overlay ${isShowingModal ? "visible" : ""}`} />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={toggleModal}
          >
            <div className="modal">
              <div>
                <h1 style={{ color: currentColor }}>{content}</h1>
                <p style={{ color: currentColor }}>
                  Sed porta odio at libero consectetur commodo. Suspendisse quis
                  ligula sit amet leo porta viverra. Nullam maximus ex quis
                  magna venenatis semper. Curabitur augue orci, pretium sed
                  libero eu, sollicitudin porttitor ipsum. Curabitur in urna a
                  dolor lobortis hendrerit sed ut metus.
                </p>
              </div>
              <Link to="/contact" state={{ backUrl: backUrl }}>
                <Logo currentColor={currentColor} />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// const Modal = ({
//   isShowingModal,
//   toggleModal,
//   content,
//   currentColor,
//   backUrl,
// }) =>
//   isShowingModal
//     ? ReactDOM.createPortal(
//         <React.Fragment>
//           <div className={`modal-overlay ${isShowingModal ? "visible" : ""}`} />
//           <div
//             className="modal-wrapper"
//             aria-modal
//             aria-hidden
//             tabIndex={-1}
//             role="dialog"
//             onClick={toggleModal}
//           >
//             <div className="modal">
//               <div>
//                 <h1 style={{ color: currentColor }}>{content}</h1>
//                 <p style={{ color: currentColor }}>
//                   Sed porta odio at libero consectetur commodo. Suspendisse quis
//                   ligula sit amet leo porta viverra. Nullam maximus ex quis
//                   magna venenatis semper. Curabitur augue orci, pretium sed
//                   libero eu, sollicitudin porttitor ipsum. Curabitur in urna a
//                   dolor lobortis hendrerit sed ut metus.
//                 </p>
//               </div>
//               <Link to="/contact" state={{ backUrl: backUrl }}>
//                 <Logo currentColor={currentColor} />
//               </Link>
//             </div>
//           </div>
//         </React.Fragment>,
//         document.body
//       )
//     : null

export default Modal
