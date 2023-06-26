import React, { ReactNode } from 'react'

import './Modal.scss'

interface ModalProps {
   children: React.ReactNode;
}

const Modal = ({children}: ModalProps) => {

   return (
      <div className='modalBackground'>
         <div className="modalContainer">
            {/* {children(setModal)} */}
            {/* {React.cloneElement(children, { setModal: setModal})} */}
            {children}
              
         </div>
      </div>
   )
}

export default Modal