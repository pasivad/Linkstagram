import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './LanguageHeader.scss';

const LanguageHeader = () => {
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const onClickLanguageChange = (event: React.MouseEvent) => {
    const language = event.target as HTMLButtonElement;
    i18n.changeLanguage(language.value.toLowerCase());
  };

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, true);
  // }, []);

  // const refOne = useRef<HTMLButtonElement>(null);

  // const handleClickOutside = (e: any) => {
  //   if (refOne.current != null) {
  //     if (!refOne.current.contains(e.target)) {
  //       setShowLanguage(false);
  //     } else {
  //       setShowLanguage(true);
  //     }
  //   }
  // };

  return (
    <div className="languageBurger">
      <button onClick={() => setShowLanguage(!showLanguage)} className="languageHeader_button">
        {i18n.language.toUpperCase()}
      </button>
      {showLanguage && (
        <div
          onMouseLeave={() => setShowLanguage(false)}
          className="chooseLanguage_button"
          onClick={() => setShowLanguage(false)}
        >
          <button className="languageButton_item" value={t('language.item1') || 'en'} onClick={onClickLanguageChange}>
            {t('language.item1')}
          </button>
          <button className="languageButton_item" value={t('language.item2') || 'en'} onClick={onClickLanguageChange}>
            {t('language.item2')}
          </button>
          <button className="languageButton_item" value={t('language.item3') || 'en'} onClick={onClickLanguageChange}>
            {t('language.item3')}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageHeader;
