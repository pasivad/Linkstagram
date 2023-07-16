import React from 'react';

import Header from '../../components/Header/Header';
import LanguageHeader from '../../components/LanguageHeader/LanguageHeader';
import PhotosBlock from '../../components/PhotosBlock/PhotosBlock';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import './SignUp.scss';

const SignUp = () => {
  return (
    <>
      <Header>
        <LanguageHeader />
      </Header>
      <div className="signUpContainer">
        <PhotosBlock />
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;
