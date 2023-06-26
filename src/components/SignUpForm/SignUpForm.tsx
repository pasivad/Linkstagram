import React from 'react'
import {Link, Navigate} from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import './SignUpForm.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import { fetchRegister, selectIsLogin } from '../../redux/slices/user'

const SignUpForm = () => {
   const {t} = useTranslation()

   const dispatch = useDispatch<AppDispatch>()
   const isAuth = useSelector(selectIsLogin)

   const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
      defaultValues: {
         email: "",
         userName: "",
         password: ""
      }, mode: 'onChange'
   })


   const onSubmit = async (values:Object) => {
      const data = await dispatch(fetchRegister(values))

      if (!data.payload) {
         return alert('Failed to register')
      }

      if ('token' in data.payload) {
         window.localStorage.setItem('token', data.payload.token)
      }
   }

   if (isAuth) {
      return <Navigate to="/home" />
   }

   return (
      <div className='signUp_container'>
         <form className='signUp' onSubmit={handleSubmit(onSubmit)}>
            <div className='signUp_title'>{t("signUpHeader")}</div>
            <label htmlFor="email">Email</label>
            <input className='input_email' type="text"
            {...register('email', { required: 'Enter Email'})} placeholder='example@gmail.com'/>
            <label htmlFor="username">User Name</label>
            <input className='input_username' type="text"
            {...register('userName', { required: 'Enter User Name'})} placeholder='Vasyl Vasylyk'/>
            <label htmlFor="password">Password</label>
            <input className='input_password' type="text"
            {...register('password', { required: 'Enter Password'})} placeholder='Type in...'/>
            <button className='signUp_button'>{t("signUpHeader")}</button>
            <div className='accountExist'>
               {t("signUpFooter")}  
               <Link to='/signin'>{t("signInHeader")}</Link>
            </div>
         </form>
      </div>
   )
}

export default SignUpForm