import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './RegisterPage.module.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import SettingsMenu from '../../UI/SettingsMenu/SettingsMenu';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

interface IFieldsChecker {
  email: boolean;
  displayName: boolean;
  password: boolean;
}

const RegisterPage = () => {
  const emailRef = useRef<HTMLInputElement>(null); // rerenders reduce
  const displayNameRef = useRef<HTMLInputElement>(null); // rerenders reduce
  const passwordRef = useRef<HTMLInputElement>(null); // rerenders reduce
  const photoRef = useRef<HTMLInputElement>(null);
  const [registerErr, setRegErr] = useState('');
  const [fieldsPassed, setPassedFields] = useState<IFieldsChecker>({
    email: false,
    displayName: false,
    password: false,
  });
  const [touchedFields, setTouchedFields] = useState<IFieldsChecker>({
    email: false,
    displayName: false,
    password: false,
  });
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const verification = () => {
    if (
      emailRef.current &&
      passwordRef.current &&
      displayNameRef.current &&
      photoRef.current
    ) {
      if (
        emailRef.current.value.trim() != '' &&
        emailRef.current.value.length > 5
      ) {
        //? rerenders reduce
        if (fieldsPassed.email == false) {
          setPassedFields((prev) => ({ ...prev, email: true }));
        }
      } else {
        //? rerenders reduce
        if (fieldsPassed.email == true) {
          setPassedFields((prev) => ({ ...prev, email: false }));
        }
      }
      if (
        displayNameRef.current.value.trim() != '' &&
        displayNameRef.current.value.length > 3
      ) {
        if (fieldsPassed.displayName == false) {
          setPassedFields((prev) => ({ ...prev, displayName: true }));
        }
      } else {
        if (fieldsPassed.displayName == true) {
          setPassedFields((prev) => ({ ...prev, displayName: false }));
        }
      }
      if (
        passwordRef.current.value.trim() != '' &&
        passwordRef.current.value.length > 5
      ) {
        if (fieldsPassed.password == false) {
          setPassedFields((prev) => ({ ...prev, password: true }));
        }
      } else {
        if (fieldsPassed.password == true) {
          setPassedFields((prev) => ({ ...prev, password: false }));
        }
      }
    }
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      fieldsPassed.email &&
      fieldsPassed.displayName &&
      fieldsPassed.password
    ) {
      Registration();
    }
  };

  const Registration = async () => {
    let email: string;
    let password: string;
    let displayName: string;
    let photo: File;
    if (
      emailRef.current &&
      passwordRef.current &&
      displayNameRef.current &&
      photoRef.current?.files
    ) {
      email = emailRef.current.value;
      password = passwordRef.current.value;
      displayName = displayNameRef.current.value;
      photo = photoRef.current.files[0]; //! <==== files
      console.log(photo);
      try {
        // 1. створення користувача
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // 2. завантаження фото в store
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, photo);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            setRegErr('Аватарка не завантажилась');
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log('File available at', downloadURL);
                await updateProfile(res.user, {
                  displayName: displayName,
                  photoURL: downloadURL,
                });
                // 3. збереження інформації в БД (для візуала)
                await setDoc(doc(db, 'users', res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
                // 4. колекція чатів користувача
                await setDoc(doc(db, 'userChats', res.user.uid), {});
                navigate('/');
              }
            );
          }
        );
      } catch (error) {
        setRegErr('Щось пішло не так');
      }
    }
  };

  return (
    <div className={style.background}>
      <SettingsMenu />

      <div className={style.content}>
        <form onSubmit={(e) => submitHandler(e)} className={style.login_form}>
          <div className={style.field}>
            <span>{t('email')}</span>
            <input
              ref={emailRef}
              type="email"
              onBlur={() => {
                setTouchedFields(() => ({
                  ...touchedFields,
                  email: true,
                }));
              }}
              onChange={() => verification()}
            />
          </div>
          <span className={style.wrong_field}>
            {!fieldsPassed.email && touchedFields.email
              ? t('emailError')
              : 'ㅤ'}
          </span>
          <div className={style.field}>
            <span>{t('nick')}</span>
            <input
              ref={displayNameRef}
              onBlur={() => {
                setTouchedFields(() => ({
                  ...touchedFields,
                  displayName: true,
                }));
              }}
              onChange={() => verification()}
              type="text"
            />
          </div>
          <span className={style.wrong_field}>
            {!fieldsPassed.displayName && touchedFields.displayName
              ? t('nickError')
              : 'ㅤ'}
          </span>
          <div className={style.field}>
            <span>{t('password')}</span>
            <input
              ref={passwordRef}
              onBlur={() => {
                setTouchedFields(() => ({
                  ...touchedFields,
                  password: true,
                }));
              }}
              onChange={() => verification()}
              type="text"
            />
          </div>
          <span className={style.wrong_field}>
            {!fieldsPassed.password && touchedFields.password
              ? t('passwordError')
              : 'ㅤ'}
          </span>
          <span>{t('avatar')}</span>
          <label className={style['custom-file-upload']}>
            <input type="file" ref={photoRef} />
            <svg
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </label>
          <div className={style.actions}>
            <button className={style.login_button}>{t('toRegister')}</button>
            {registerErr}
            <span>
              {t('alreadyHaveAccount')}{' '}
              <NavLink to={'/login'}>{t('Login')}</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
