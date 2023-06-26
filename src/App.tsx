import React from 'react';
import { Routes, Link, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginMe, selectIsLogin } from './redux/slices/user';

import type { AppDispatch } from './redux/store';

import './assets/scss/styles.scss'

import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';


function App() {
  const dispatch = useDispatch<AppDispatch>()
  const isAuth = useSelector(selectIsLogin)

  React.useEffect(() => {
    dispatch(fetchLoginMe())
  }, []) 

  return (
    <Routes>
      <Route path='/' element={<SignUp />}></Route>
      <Route path='/signin' element={<SignIn />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/home/:id' element={<Home />}></Route>
      <Route path='/profile/:id' element={<Profile />}></Route>
      <Route path='/profile/:id/:id' element={<Profile />}></Route>
      <Route path='*' element={<Navigate to='/'/>}/>
    {/* <Route path="/" element={<Home searchValue={searchValue}/>} /> */}
    {/* <Route path="/service" element={<Service knowPhone={knowPhone} setKnowPhone={setKnowPhone} searchPrice={searchPrice} setSearchPrice={setSearchPrice} />} />
    <Route path="/service/payment" element={<Payment knowPhone={knowPhone} searchPrice={searchPrice} />} /> */}
    </Routes>
    // <SignUp />
    // <SignIn />
  );
}

export default App;
