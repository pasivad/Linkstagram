import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../redux/store';

import Header from '../../components/Header/Header';
import SignOutHeader from '../../components/SignOutHeader/SignOutHeader';
import LanguageHeader from '../../components/LanguageHeader/LanguageHeader';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Posts from '../../components/Posts/Posts';
import SidebarProfile from '../../components/SidebarProfile/SidebarProfile';
import Modal from '../../components/Modal/Modal';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import NewPostForm from '../../components/NewPostForm/NewPostForm';
import StoriesLayout from '../../components/StoriesLayout/StoriesLayout';
import PostForm from '../../components/PostForm/PostForm';

import './Home.scss';
import { fetchLoginSessions } from '../../redux/slices/loginSessions';

interface UserProps {
  data: {
    userName: string;
    avatarUrl: string;
    followers: number;
    following: number;
    job: string;
    description: string;
    role: string;
  } | null;
  status: string;
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const modals = useSelector((state: RootState) => state.modals);
  const { loginSessions } = useSelector((state: RootState) => state.loginSessions);

  const user: UserProps = useSelector((state: RootState) => state.user);

  const isLoginSessionsLoading = loginSessions.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchLoginSessions());
  }, []);

  if (modals.postForm || modals.newPostForm || modals.editProfileForm || modals.stories) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  const [inputText, setInputText] = useState<string>('');
  const vigenereKey = 'lab 3 pasichnyk vladyslav';

  const checkVigenere = () => {
    const normalizedInput = inputText.toLowerCase();
    const normalizedKey = vigenereKey.toLowerCase();

    let encryptedText = '';
    const keyLength = normalizedKey.length;
    const textLength = normalizedInput.length;

    for (let i = 0; i < textLength; i++) {
      const currentChar = normalizedInput.charCodeAt(i);
      const keyChar = normalizedKey.charCodeAt(i % keyLength);

      if (currentChar >= 97 && currentChar <= 122) {
        const encryptedChar = ((currentChar - 97 + keyChar - 97) % 26) + 97;
        encryptedText += String.fromCharCode(encryptedChar);
      } else {
        encryptedText += normalizedInput.charAt(i);
      }
    }

    if (encryptedText === normalizedInput) {
      alert('Success! Text matches Vigenere cipher key.');
    } else {
      alert('Text does not match Vigenere cipher key.');
    }
  };

  return (
    <>
      <Header>
        <SignOutHeader />
        <LanguageHeader />
        <ProfileHeader />
      </Header>
      <div className="homeContainer">
        {user?.data?.role === 'Admin' ? (
          <div>
            <div className="adminTitle">Admin Panel</div>
            <div style={{ marginBottom: '10px' }}>Login Sessions</div>
            {isLoginSessionsLoading ? (
              <div>Loading</div>
            ) : (
              (isLoginSessionsLoading ? [...Array(3)] : loginSessions.items).map((obj, index) => (
                <div
                  className="tr"
                  key={index}
                >
                  <div>{obj.user.userName}</div>
                  <div>{obj.loginDate}</div>
                </div>
              ))
            )}
            <div className='vigenereEncryption'>
              <label htmlFor="inputText">Enter Text:</label>
              <input
                type="text"
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button onClick={checkVigenere}>Check</button>
            </div>
          </div>
        ) : (
          <Posts />
        )}
        <SidebarProfile />
      </div>
      {modals.editProfileForm && (
        <Modal>
          <EditProfileForm />
        </Modal>
      )}
      {modals.newPostForm && (
        <Modal>
          <NewPostForm />
        </Modal>
      )}
      {modals.stories && <StoriesLayout />}
      {modals.postForm && (
        <Modal>
          <PostForm />
        </Modal>
      )}
    </>
  );
};

export default Home;
