import React from 'react';
import style from './LoginPage.module.css';
import { NavLink } from 'react-router-dom';

interface IFieldsChecker {
  email: boolean;
  nickname: boolean;
  password: boolean;
}

const LoginPage: React.FC = () => {
  const emailRef = React.useRef<HTMLInputElement>(null); // rerenders increase
  const passwordRef = React.useRef<HTMLInputElement>(null); // rerenders increase
  const [fieldsPassed, setPassedFields] = React.useState<IFieldsChecker>({
    email: false,
    nickname: false,
    password: false,
  });
  const [touchedFields, setTouchedFields] = React.useState<IFieldsChecker>({
    email: false,
    nickname: false,
    password: false,
  });
  const verification = () => {
    if (emailRef.current && passwordRef.current) {
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
    if (emailRef.current && passwordRef.current) {
      if (fieldsPassed.email && fieldsPassed.password) {
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
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
          {/* <div className={style.field}>
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
          </span> */}
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
          <div className={style.actions}>
            <button className={style.login_button}>Ввійти</button>
            <span>
              Немає акка? <NavLink to={'/registration'}>Зарегать</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
