import React, { useContext } from 'react';
import style from './ContactItem.module.css';
import { User } from 'firebase/auth';
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../../../context/AuthContext';
import { ISearchedUser } from '../SideBar';

const ContactItem: React.FC<ISearchedUser> = (props) => {
  const { authedUser }: { authedUser: User } = useContext<any>(AuthContext);

  const createChatOnSelect = async () => {
    if (authedUser.displayName != null) {
      let chatId =
        authedUser.displayName < props.displayName //синхронізація айді чату
          ? authedUser.displayName + '_' + props.displayName
          : props.displayName + '_' + authedUser.displayName;
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

  const defautImg: React.ReactEventHandler<HTMLImageElement> | undefined = (
    e
  ) => {
    e.currentTarget.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7eMS1cDRE1KTr0o7sXBUojGRtrHZeAWKZ7I8KZc8gREJsX6RVmp5Mc3i4iWX_rbXax04&usqp=CAU';
  };

  return (
    <div onClick={() => createChatOnSelect()} className={style.contact_wrapper}>
      <img
        className={style.contact_icon}
        src={props.photoURL}
        alt="Avatar"
        height={65}
        width={65}
        onError={(e) => defautImg(e)}
      />
      <div className={style.contact_info}>
        <span className={style.contact_nickmane}>{props.displayName}</span>
        <span className={style.contact_last_message}>last message</span>
      </div>
    </div>
  );
};

export default ContactItem;
