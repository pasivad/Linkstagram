import React from 'react'
import { Link } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'

import './StoriesLayout.scss'
import StoriesOpenItem from '../StoriesOpenItem/StoriesOpenItem'

interface StoriesLayoutProps {
   setOpenStory: Function
}

const StoriesLayout = ({setOpenStory}: StoriesLayoutProps) => {
   const stories = [
      {className: "storiesOpenItem"},
      {className: "storiesOpenItem"},
      {className: "storiesOpenItem storiesOpenItem--active"},
      {className: "storiesOpenItem"},
      {className: "storiesOpenItem"}
   ]
   return (
      <div className='storiesLayout'>
         <div className="storiesLayoutHeader">
            <Link to='/home' className="storiesLayoutTitle" onClick={() => setOpenStory(false)}>
               Linkstagram
            </Link>
            <button className='storiesCloseBtn' onClick={() => setOpenStory(false)}>
               <IoClose />    
            </button>
         </div>
         <div className="storiesLayoutSlider">
            {
               stories.map((story, id) => (
                  <StoriesOpenItem key={id} className={story.className} />
               ))
            }

         </div>
      </div>
   )
}

export default StoriesLayout