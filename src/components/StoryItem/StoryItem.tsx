import React from 'react'
import { useState } from 'react'

import storiesAvatar from '../../assets/images/avatars/avatar1.png'

import './StoryItem.scss'

interface StoryItemProps {
   setOpenStory: Function
}

const StoryItem = ({setOpenStory}: StoryItemProps) => {

   return (
      <>
         <div className='storyItem' onClick={() => setOpenStory(true)}>
            <img src={storiesAvatar} alt="avatar" />
         </div>
      </>
   )
}

export default StoryItem