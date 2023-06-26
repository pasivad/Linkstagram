import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

import global_en from './translations/en/global.json'
import global_ua from './translations/ua/global.json'
import global_pl from './translations/pl/global.json'
import global_ru from './translations/ru/global.json'


const resources = {
  en: {
    translation: global_en
  },
  ua: {
    translation: global_ua
  },
  pl: {
    translation: global_pl
  },
  ru: {
    translation: global_ru
  }
}


i18next.use(initReactI18next).init({
  resources,
  lng: "en",
})

export default i18next