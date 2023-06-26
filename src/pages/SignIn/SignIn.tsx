import React from 'react'

import './SignIn.scss'

import Header from '../../components/Header/Header'
import LanguageHeader from '../../components/LanguageHeader/LanguageHeader'
import PhotosBlock from '../../components/PhotosBlock/PhotosBlock'
import SignInForm from '../../components/SignInForm/SignInForm'

const SignIn = () => {
   return (
      <>
         <Header>            
            <LanguageHeader />
         </Header>
         <div className="signInContainer">
            <PhotosBlock />
            <SignInForm />
         </div>
      </>
   )
}

export default SignIn