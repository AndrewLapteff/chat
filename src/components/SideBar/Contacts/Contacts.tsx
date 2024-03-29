import { useEffect, useState } from 'react';
import ContactItem from '../ContactItem/ContactItem';
import style from './Contacts.module.css';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';

export interface IContact {
  info: {
    displayName: string;
    photo: string;
    uid: string;
    lastMessage?: string;
  };
  date: {
    seconds: number;
  };
  lastMessage: string;
}

interface IContacts {
  [index: number]: IContact;
}

const Contacts = () => {
  const authedUser = useAuth();
  const [contacts, setContacts] = useState<IContacts[]>([]);

  // Підписка на контакти в реальному часі
  useEffect(() => {
    function getConstacts() {
      const unsub = onSnapshot(
        doc(db, 'userChats', authedUser.uid),
        (doc: any) => {
          let data: DocumentData[] = Object.entries(doc.data());
          setContacts(data);
        }
      );
      return () => {
        unsub;
      };
    }

    authedUser.uid && getConstacts();
  }, []);

  return (
    <div className={style.contacts_menu}>
      {contacts
        .sort((a, b) => b[1].date.seconds - a[1].date.seconds) //сортування за датою змінення
        .map((item) => {
          return (
            <ContactItem
              date={item[1].date.seconds}
              lastMessage={item[1].lastMessage}
              displayName={item[1].info.displayName}
              photoURL={item[1].info.photo}
              uid={item[1].info.uid}
              key={item[1].date.seconds}
            />
          );
        })}
    </div>
  );
};

export default Contacts;
