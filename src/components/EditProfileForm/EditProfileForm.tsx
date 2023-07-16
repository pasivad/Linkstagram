import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { showEditProfileForm } from '../../redux/slices/modals';
import { editUserInfo } from '../../api/requests';

import './EditProfileForm.scss';

// interface Props<T> {
//   number1: T;
//   obj?: Record<string | number, T>;
//   function?: (prop: T) => void;
// }

const EditProfileForm = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [userName, setUserName] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // const m: Props<number> = { number1: 0 };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleJob = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJob(event.target.value);
  };
  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  const handleSubmit = () => {
    editUserInfo({ userName, job, description });
  };

  return (
    <form className="editProfileForm">
      <h1 className="editProfileTitle">{t('modal.editProfileHeader')}</h1>
      <div className="inputItem">
        <label htmlFor="uName">{t('modal.userName')}</label>
        <input type="text" placeholder={`${t('modal.userNamePlaceholder')}`} onChange={handleUserName} />
      </div>
      <div className="inputItem">
        <label htmlFor="job">{t('modal.job')}</label>
        <input type="text" placeholder={`${t('modal.jobPlaceholder')}`} onChange={handleJob} />
      </div>
      <div className="inputItem">
        <label htmlFor="description">{t('modal.description')}</label>
        <textarea rows={2} placeholder={`${t('modal.descriptionPlaceholder')}`} onChange={handleDescription} />
      </div>
      <div className="editProfileButtons">
        <button onClick={() => dispatch(showEditProfileForm())} className="editProfileBtn editProfileBtn--cancel">
          {t('modal.cancelBtn')}
        </button>
        <button onClick={handleSubmit} className="editProfileBtn editProfileBtn--save">
          {t('modal.saveBtn')}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
