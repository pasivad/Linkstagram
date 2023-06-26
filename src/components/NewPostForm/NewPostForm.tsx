import React, { useState } from 'react'
import { IoMdPhotos } from 'react-icons/io'
import { useTranslation } from 'react-i18next'

import './NewPostForm.scss'
import axios from '../../axios'

interface NewPostFormProps {
   setModal: Function
}

const NewPostForm = ({setModal}: NewPostFormProps) => {
   const {t} = useTranslation()
   const [text, setText] = useState("")
   const [postImage, setPostImage] = useState("")
   const [images, setImages] = useState<any>([])
   const [imageURLs, setImageURLs] = useState<any>([])


   React.useEffect(() => { 
      if (images.length < 1) return
      const newImageUrls: string[] = []
      images.forEach((image:any) => {
         newImageUrls.push(URL.createObjectURL(image))
      }); 
      setImageURLs(newImageUrls)
   }, [images])


   const handleFileChange = async (event:any) => {
      setPostImage(event.target.files[0])
      setImages([...event.target.files])
   }
   const handleTextChange = async (event:any) => {
      setText(event.target.value)
   }

   

   const createPost = async () => {
      // setModal(false)
      try {
         let formData = new FormData();
         formData.append('imageUrl', postImage)
         formData.append('text', text)
         axios.post('/post', formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            }
         }).then(res => window.location.reload())
      } catch (err) {
         console.warn(err)
         alert("Failed to create post@")
      }
   }
   console.log(imageURLs)

   return (
   <div className='newPostForm'>
      <input type="file" id="actual-btn" hidden 
      onChange={handleFileChange}/>
      {
         imageURLs.length < 1 ? (
         <label className='choosePhoto' htmlFor="actual-btn">
            <IoMdPhotos />
            {t("modal.uploadPhoto")}
         </label>
         ) : (
         <label className='choosePhoto choosePhoto--active' htmlFor="actual-btn">
            <img className='loadedImage' src={imageURLs}></img> 
         </label>)
      }

      <div className="inputItem">
         <label htmlFor="text">{t("modal.description")}</label>
         <textarea rows={4} value={text} onChange={handleTextChange}
         placeholder={`${t("modal.descriptionPlaceholder")}`}/>
      </div>
      <div className="editProfileButtons">
         <button onClick={() => setModal(false)} className='editProfileBtn editProfileBtn--cancel'>{t("modal.cancelBtn")}</button>
         <button onClick={createPost} className='editProfileBtn editProfileBtn--save'>{t("modal.saveBtn")}</button>
      </div>
   </div>
   )
}

export default NewPostForm