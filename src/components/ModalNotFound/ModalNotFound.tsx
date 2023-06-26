import React from 'react'

import './ModalNotFound.scss'
import error from '../../assets/images/sad.webp'

const ModalNotFound = () => {
   return (
      <div className='modalNotFound'>
         <div> 
         Something goes WRONG. Try refreshing the page. 
         </div>
         <div className='modalExplanation'>Maybe you have choosen incorrect language.</div>
         <img src={error} alt="" />
      </div>
   )
}
export default ModalNotFound