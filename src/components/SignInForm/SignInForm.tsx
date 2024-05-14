import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLogin, selectIsLogin } from '../../redux/slices/user';
import type { AppDispatch } from '../../redux/store';

import './SignInForm.scss';

const SignInForm = () => {
  const { t } = useTranslation();

  const isAuth = useSelector(selectIsLogin);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    if (!email || !password) {
      setError('email', { type: 'focus' }, { shouldFocus: true });
    }
    const data = await dispatch(fetchLogin({ email, password }));
    if (!data.payload) {
      return alert('Failed to login');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="signIn_container">
      <form
        className="signIn"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="signIn_title">{t('signInHeader')}</div>
        <label htmlFor="email">Email</label>
        <input
          className="input_email"
          type="text"
          placeholder="example@gmail.com"
          {...register('email', { required: 'Enter email' })}
        />
        <label htmlFor="password">Password</label>
        <input
          className="input_password"
          type="password"
          placeholder="Type in..."
          {...register('password', { required: 'Enter password' })}
        />
        {errors.email && <p className="error">Mandatory info missing</p>}
        <button className="signIn_button">{t('signInHeader')}</button>
        <div className="registerAccount">
          {t('signInFooter')}
          <Link to="/">{t('signUpHeader')}</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
