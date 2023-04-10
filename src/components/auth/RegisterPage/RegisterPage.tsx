import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './RegisterPage.module.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

interface IFieldsChecker {
  email: boolean;
  nickname: boolean;
  password: boolean;
}

const RegisterPage = () => {
  const emailRef = useRef<HTMLInputElement>(null); // rerenders reduce
  const nicknameRef = useRef<HTMLInputElement>(null); // rerenders reduce
  const passwordRef = useRef<HTMLInputElement>(null); // rerenders reduce
  const photoRef = useRef<HTMLInputElement>(null);
  const [registerErr, setRegErr] = useState('');
  const [fieldsPassed, setPassedFields] = useState<IFieldsChecker>({
    email: false,
    nickname: false,
    password: false,
  });
  const [touchedFields, setTouchedFields] = useState<IFieldsChecker>({
    email: false,
    nickname: false,
    password: false,
  });
  const navigate = useNavigate();

  const verification = () => {
    if (
      emailRef.current &&
      passwordRef.current &&
      nicknameRef.current &&
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
        nicknameRef.current.value.trim() != '' &&
        nicknameRef.current.value.length > 3
      ) {
        if (fieldsPassed.nickname == false) {
          setPassedFields((prev) => ({ ...prev, nickname: true }));
        }
      } else {
        if (fieldsPassed.nickname == true) {
          setPassedFields((prev) => ({ ...prev, nickname: false }));
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
    if (fieldsPassed.email && fieldsPassed.nickname && fieldsPassed.password) {
      Registration();
    }
  };

  const Registration = async () => {
    let email: string;
    let password: string;
    let nickname: string;
    let photo: any;
    if (
      emailRef.current &&
      passwordRef.current &&
      nicknameRef.current &&
      photoRef.current?.files
    ) {
      email = emailRef.current.value;
      password = passwordRef.current.value;
      nickname = nicknameRef.current.value;
      photo = photoRef.current.files[0]; //! <==== files
      console.log(photo);
      try {
        // 1. створення користувача
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // 2. завантаження фото в store
        const storageRef = ref(storage, nickname);
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
                  displayName: nickname,
                  photoURL: downloadURL,
                });
                // 3. збереження інформації в БД (для візуала)
                await setDoc(doc(db, 'users', res.user.uid), {
                  uid: res.user.uid,
                  nickname,
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
      <div className={style.content}>
        <form onSubmit={(e) => submitHandler(e)} className={style.login_form}>
          <div className={style.field}>
            <span>Електронна пошта (верифікація відсутня)</span>
            <input
              ref={emailRef}
              type="text"
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
              ? 'Введіть пошту вірно'
              : 'ㅤ'}
          </span>
          <div className={style.field}>
            <span>Нік</span>
            <input
              ref={nicknameRef}
              onBlur={() => {
                setTouchedFields(() => ({
                  ...touchedFields,
                  nickname: true,
                }));
              }}
              onChange={() => verification()}
              type="text"
            />
          </div>
          <span className={style.wrong_field}>
            {!fieldsPassed.nickname && touchedFields.nickname
              ? 'Нік має влючати від 3 до 9 символів'
              : 'ㅤ'}
          </span>
          <div className={style.field}>
            <span>Пароль</span>
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
              ? 'Пароль має бути від 2 до 15 символів'
              : 'ㅤ'}
          </span>
          <span>Аватарка</span>
          <label className={style['custom-file-upload']}>
            <input type="file" ref={photoRef} />
            <svg
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              // className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {/* ㅤАватарка */}
          </label>
          <div className={style.actions}>
            <button className={style.login_button}>Зареєструватись</button>
            {registerErr}
            <span>
              Вже є акк? <NavLink to={'/login'}>Ввійти</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
