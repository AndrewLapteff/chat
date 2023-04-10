import React from 'react';
import style from './ContactItem.module.css';

interface ISearchUser {
  email: string;
  nickname: string;
  photoURL: string;
  uid: string;
}

const ContactItem: React.FC<ISearchUser> = (props) => {
  return (
    <div className={style.contact_wrapper}>
      <img
        className={style.contact_icon}
        src={props.photoURL}
        alt="Avatar"
        height={65}
        width={65}
      />
      <div className={style.contact_info}>
        <span className={style.contact_nickmane}>{props.nickname}</span>
        <span className={style.contact_last_message}>last message</span>
      </div>
    </div>
  );
};

export default ContactItem;
