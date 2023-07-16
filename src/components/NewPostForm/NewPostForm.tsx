import React, { useState } from 'react';
import { IoMdPhotos } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { showNewPostForm } from '../../redux/slices/modals';

import { addPost } from '../../api/requests';

import './NewPostForm.scss';

const NewPostForm = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [text, setText] = useState<string>('');
  const [uploadImage, setUploadImage] = useState<File>();
  const [imageURLs, setImageURLs] = useState<string>('');

  React.useEffect(() => {
    if (!uploadImage) return;
    setImageURLs(URL.createObjectURL(uploadImage));
  }, [uploadImage]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setUploadImage(event.target.files[0]);
  };
  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onSubmit = () => {
    addPost({ text, image: uploadImage! });
  };

  return (
    <div className="newPostForm">
      <input type="file" id="actual-btn" hidden onChange={handleFileChange} />
      {!imageURLs ? (
        <label className="choosePhoto" htmlFor="actual-btn">
          <IoMdPhotos />
          {t('modal.uploadPhoto')}
        </label>
      ) : (
        <label className="choosePhoto choosePhoto--active" htmlFor="actual-btn">
          <img className="loadedImage" src={imageURLs} alt="loadedImage"></img>
        </label>
      )}

      <div className="inputItem">
        <label htmlFor="text">{t('modal.description')}</label>
        <textarea
          rows={4}
          value={text}
          onChange={handleTextChange}
          placeholder={`${t('modal.descriptionPlaceholder')}`}
        />
      </div>
      <div className="editProfileButtons">
        <button onClick={() => dispatch(showNewPostForm())} className="editProfileBtn editProfileBtn--cancel">
          {t('modal.cancelBtn')}
        </button>
        <button onClick={onSubmit} className="editProfileBtn editProfileBtn--save">
          {t('modal.saveBtn')}
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;
