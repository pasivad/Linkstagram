import React from 'react'

import './ModalError.scss'
import error from '../../assets/images/sad.webp'

const ModalError = () => {
   return (
      <div className='modalError'>
         <div> 
         Something goes WRONG. Try refreshing the page. 
         </div>
         <div className='modalExplanation'>Maybe you have choosen incorrect language.</div>
         <img src={error} alt="" />
      </div>
   )
}
export default ModalError