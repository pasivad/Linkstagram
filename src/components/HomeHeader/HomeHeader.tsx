import React from 'react'

import './HomeHeader.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { selectIsLogin } from '../../redux/slices/user'
import { useSelector } from 'react-redux'

const HomeHeader = () => {
   const {t} = useTranslation()

   const isAuth = useSelector(selectIsLogin);
   return (
      <Link to='/home' className='homeHeader'>
         {t("homeButton")}
      </Link>  
   )
}

export default HomeHeader