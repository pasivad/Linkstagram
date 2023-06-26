import React from 'react'

import welcome1 from '../../assets/images/welcome/welcome1.png'
import welcome2 from '../../assets/images/welcome/welcome2.png'
import welcome3 from '../../assets/images/welcome/welcome3.png'
import welcome4 from '../../assets/images/welcome/welcome4.png'



import './PhotosBlock.scss'

const PhotosBlock = () => {
   return (
      <div className='photosBlock'>
         <img className='welcome1' src={welcome1} alt="" />
         <img className='welcome2' src={welcome2} alt="" />
         <img className='welcome3' src={welcome3} alt="" />
         <img className='welcome4' src={welcome4} alt="" />
      </div>
   )
}

export default PhotosBlock