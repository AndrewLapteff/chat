import style from './Messages.module.css';
import ContactsMessage from './ContactsMessage';
import MyMessage from './MyMessage';

const Messages = () => {
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
