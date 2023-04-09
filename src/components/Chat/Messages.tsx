import React from 'react';
import style from './Messages.module.css';
import ContactsMessage from './ContactsMessage';
import MyMessage from './MyMessage';

const Messages: React.FC = () => {
  return (
    <div className={style.messages_wrapper}>
      <ContactsMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
      <MyMessage />
    </div>
  );
};

export default Messages;
