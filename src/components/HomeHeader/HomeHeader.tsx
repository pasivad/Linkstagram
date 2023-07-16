import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './HomeHeader.scss';

const HomeHeader = () => {
  const { t } = useTranslation();

  return (
    <Link to="/home" className="homeHeader">
      {t('homeButton')}
    </Link>
  );
};

export default HomeHeader;
