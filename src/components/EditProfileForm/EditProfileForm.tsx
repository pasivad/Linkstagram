import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './EditProfileForm.scss'
import { useForm } from 'react-hook-form'
import axios from '../../axios'

interface EditProfileFormProps {
   setModal: Function
}

const EditProfileForm = ({setModal}: EditProfileFormProps) => {
   const {t} = useTranslation()
   const [userName, setUserName] = useState()
   const [job, setJob] = useState()
   const [description, setDescription] = useState()

   const handleUserName = (event:any) => {
      setUserName(event.target.value)
   }
   const handleJob = (event:any) => {
      setJob(event.target.value)
   }
   const handleDescription = (event:any) => {
      setDescription(event.target.value)
   }
   const editUserInfo = () => {
      axios.patch('/user', {
         userName: userName,
         job: job, 
         description: description
      })
   }
   return (
      <form className='editProfileForm'>
         <h1 className='editProfileTitle'>{t("modal.editProfileHeader")}</h1>
         <div className="inputItem">
            <label htmlFor="uName">{t("modal.userName")}</label>
            <input type="text" placeholder={`${t("modal.userNamePlaceholder")}`} onChange={handleUserName}/>
         </div>
         <div className="inputItem">
            <label htmlFor="job">{t("modal.job")}</label>
            <input type="text" placeholder={`${t("modal.jobPlaceholder")}`}
            onChange={handleJob}/>
         </div>
         <div className="inputItem">
            <label htmlFor="description">{t("modal.description")}</label>
            <textarea rows={2}placeholder={`${t("modal.descriptionPlaceholder")}`}
            onChange={handleDescription} />
         </div>
         <div className="editProfileButtons">
            <button onClick={() => setModal(false)} className='editProfileBtn editProfileBtn--cancel'>{t("modal.cancelBtn")}</button>
            <button onClick={editUserInfo} className='editProfileBtn editProfileBtn--save'>{t("modal.saveBtn")}</button>
         </div>
      </form>
   )
}

export default EditProfileForm