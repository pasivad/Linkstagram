import React from 'react'

import './SignOutHeader.scss'
import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next"
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/user'

const SignOutHeader = () => {
   const {t} = useTranslation()

   const dispatch = useDispatch()
   const onClickLogout = () => {
      if (window.confirm('Are you sure you want to logout?')) {
         dispatch(logout())
         window.localStorage.removeItem('token')
      }
   }

   return (
      <Link to='/' className='signOutHeader' onClick={onClickLogout}>
         {t("signOutHeader")}
      </Link>  
   )
}

export default SignOutHeader