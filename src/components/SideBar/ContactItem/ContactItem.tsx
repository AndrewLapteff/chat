import React from 'react';
import style from './ContactItem.module.css';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { ISearchedUser } from '../SideBar';
import { REDUCER_TYPES } from '../../../context/ChatContext';
import { useAuth } from '../../../hooks/useAuth';
import { useChatInfo } from '../../../hooks/useChatInfo';

const ContactItem: React.FC<ISearchedUser> = (props) => {
  const authedUser = useAuth();
  const { dispatch } = useChatInfo();
  const date: Date = new Date(1000 * props.date);
  const state = useChatInfo();

  const createChatOnSelect = async () => {
    if (authedUser.displayName != null) {
      let chatId =
        authedUser.displayName < props.displayName //синхронізація айді чату
          ? authedUser.displayName + '_' + props.displayName
          : props.displayName + '_' + authedUser.displayName;

      // виділення конкретного користувача в контекст
      dispatch({ type: REDUCER_TYPES.CHANGE_USER, payload: props });
      try {
        // звертаємося до загальної колекції всих чатів
        const docRef = doc(db, 'chats', chatId);
        const res = await getDoc(docRef);
        if (!res.exists()) {
          // створюємо чат
          await setDoc(doc(db, 'chats', chatId), { messages: [] });

          // створюємо інформацію про нашого співбесідника
          await updateDoc(doc(db, 'userChats', authedUser.uid), {
            [chatId + '.info']: {
              uid: props.uid,
              displayName: props.displayName,
              photo: props.photoURL,
            },
            [chatId + '.date']: serverTimestamp(),
          });

          // створюємо інформацію про нас для нашого співдебідника
          await updateDoc(doc(db, 'userChats', props.uid), {
            [chatId + '.info']: {
              uid: authedUser.uid,
              displayName: authedUser.displayName,
              photo: authedUser.photoURL,
            },
            [chatId + '.date']: serverTimestamp(),
          });
        }
      } catch (error) {}
    }
  };

  const addZero = (input: number) => {
    return input < 10 ? '0' + input : input;
  };

  const defautImg: React.ReactEventHandler<HTMLImageElement> | undefined = (
    e
  ) => {
    e.currentTarget.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7eMS1cDRE1KTr0o7sXBUojGRtrHZeAWKZ7I8KZc8gREJsX6RVmp5Mc3i4iWX_rbXax04&usqp=CAU';
  };

  const cutLongLastMessage = (input: string | undefined): string | null => {
    if (input) {
      return input.length > 40 ? input.substring(0, 30) + '...' : input;
    }
    return null;
  };
  if (props.displayName == state.state.chatInfo.displayName) {
    console.log(props.displayName);
  }

  return (
    <div
      style={{
        backgroundColor:
          props.displayName == state.state.chatInfo.displayName
            ? 'rgba(0, 0, 0, 0.41)'
            : 'rgba(0, 0, 0, 0.21)',
      }}
      onClick={() => createChatOnSelect()}
      className={style.contact_wrapper}
    >
      <div className={style.sdf}>
        <img
          className={style.contact_icon}
          src={props.photoURL}
          alt="Avatar"
          height={65}
          width={65}
          onError={(e) => defautImg(e)}
        />
        <div className={style.contact_info}>
          <div className={style.contact_descriprion}>
            <span className={style.contact_nickmane}>{props.displayName}</span>
          </div>
          <span className={style.contact_last_message}>
            {cutLongLastMessage(props.lastMessage)}
          </span>
        </div>
      </div>
      <span className={style.contact_date}>
        {date.getFullYear() != 1970 && date.getHours() + ':'}
        {date.getFullYear() != 1970 && addZero(date.getMinutes())}
      </span>
    </div>
  );
};

export default ContactItem;
