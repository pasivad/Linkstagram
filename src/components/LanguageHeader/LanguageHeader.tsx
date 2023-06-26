import React from 'react'
import {useState, useEffect, useRef} from 'react'

import './LanguageHeader.scss'

import {useTranslation} from "react-i18next"
import Modal from '../Modal/Modal'
import ModalError from '../ModalError/ModalError'

const LanguageHeader = () => {
   const [showLanguage, setShowLanguage] = useState(false)
   const [badLanguage, setBadLanguage] = useState(false)

   const {t, i18n} = useTranslation()

   const onClickLanguageChange = (e: any) => {
      const language = e.target.value.toLowerCase();
      i18n.changeLanguage(language)
      if (language === "ru") {
         setBadLanguage(true) 
         document.body.style.overflow = "hidden"
      } else {
         setBadLanguage(false)
         document.body.style.overflow = "visible"
      }
   }

   useEffect(() => {
      document.addEventListener("click", handleClickOutside, true)
   }, [])

   const refOne = useRef<HTMLButtonElement>(null)

   const handleClickOutside = (e: any) => {
      if (refOne.current != null) {
         if (!refOne.current.contains(e.target)) {
            setShowLanguage(false)
         } else {
            // onclick = () => onClickLanguageChange
            setShowLanguage(true)
         }
      }
   }

   return (
      <div className='languageBurger'>
         <button 
         onClick={() => setShowLanguage(!showLanguage)}
         className='languageHeader_button'
         >
            {i18n.language.toUpperCase()}
         </button>
         {showLanguage && 
         <div 
         onMouseLeave={() => setShowLanguage(false)} 
         className='chooseLanguage_button'
         onClick={() => setShowLanguage(false)}>
            <button 
            className='languageButton_item' 
            value={t("language.item1") || "en"}
            onClick={onClickLanguageChange}
            >
               {t("language.item1")}
            </button>
            <button 
            className='languageButton_item'
            value={t("language.item2") || "en"}
            onClick={onClickLanguageChange}>
               {t("language.item2")}
            </button>
            <button 
            className='languageButton_item'
            value={t("language.item3") || "en"}
            onClick={onClickLanguageChange}>
               {t("language.item3")}
            </button>
         </div>}
         { badLanguage && (<Modal> <ModalError /> </Modal>)}
      </div>
   )
}

export default LanguageHeader