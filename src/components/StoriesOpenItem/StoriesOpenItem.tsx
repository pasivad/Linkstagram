import React from 'react'
import Stories from 'react-insta-stories'

import './StoriesOpenItem.scss'
import photo from '../../assets/images/posts/post3.jpg'

interface StoriesOpenItemProps {
   className: string
}

const StoriesOpenItem = ({className}: StoriesOpenItemProps) => {
   const test:any = [
      "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8fDA%3D&w=1000&q=80"
   ]
   return (
      <div className={className}>
         story item
      </div>
   )
}

export default StoriesOpenItem