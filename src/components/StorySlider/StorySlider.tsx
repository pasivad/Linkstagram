import React  from 'react'
import { useState } from 'react'
import StoryItem from '../StoryItem/StoryItem'

import './StorySlider.scss'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


interface StorySliderProps {
   setOpenStory: Function
}

const StorySlider = ({setOpenStory}: StorySliderProps) => {
   const stories = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
   const [scroll, setScroll] = useState(0)
   const [iconLeftClass, setIconLeftClass] = useState("icon icon--left icon--hide")
   const [iconRightClass, setIconRightClass] = useState("icon icon--right")


   const slideLeft = () => {
      const slider = document.getElementById('slider') as HTMLButtonElement
      slider.scrollLeft = slider.scrollLeft - 300

      if (slider.scrollLeft <= 300) {
         setIconLeftClass("icon icon--left icon--hide")
      }
      if (slider.scrollLeft > 0 ) {
         setIconRightClass("icon icon--right")
      }
   }

   const slideRight = () => {
      const slider = document.getElementById('slider') as HTMLButtonElement  
      slider.scrollLeft = slider.scrollLeft + 300

      if (slider.scrollLeft === 0) {
         setIconLeftClass("icon icon--left")
      }
      if (slider.scrollLeft > (stories.length*85)-882) {
         setIconRightClass("icon icon--right icon--hide")
      }
   }

   return (
      <div className='slider'>                   
         <div className={iconLeftClass}
          onClick={() => setScroll(scroll-300)}>
            <MdChevronLeft onClick={slideLeft}/>
         </div>
         <div id='slider' className='storySlider'>
            {
               stories.map((id) => (
                  <StoryItem key={id} setOpenStory={setOpenStory}/>
               ))
            }
         </div>
         {stories.length >= 7 && (
            <div className={iconRightClass}
            onClick={() => setScroll(scroll+300)}>
               <MdChevronRight onClick={slideRight} />
            </div>
         )}
      </div>
   )
}

export default StorySlider