import React from 'react'

import '../Header/Header.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../../redux/slices/user'

interface HeaderProps {
   children: React.ReactNode
}

const Header = ({children}: HeaderProps) => {
   const isAuth = useSelector(selectIsLogin)

   return (
      <div className="header">
         <Link to={`${isAuth ? '/home' : '/'}`} className='header_title'>Linkstagram</Link>
         <nav className='nav_bar'>
            {children}
         </nav>
      </div>
   )
}

export default Header