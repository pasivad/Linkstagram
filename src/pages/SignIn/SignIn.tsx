import React from 'react';

import Header from '../../components/Header/Header';
import LanguageHeader from '../../components/LanguageHeader/LanguageHeader';
import PhotosBlock from '../../components/PhotosBlock/PhotosBlock';
import SignInForm from '../../components/SignInForm/SignInForm';

import './SignIn.scss';

const SignIn = () => (
  <>
    <Header>
      <LanguageHeader />
    </Header>
    <div className="signInContainer">
      <PhotosBlock />
      <SignInForm />
    </div>
  </>
);

export default SignIn;
