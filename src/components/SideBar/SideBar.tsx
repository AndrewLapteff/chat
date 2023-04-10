import style from './SideBar.module.css';
import ContactItem from './ContactItem';
import AccountInfo from './AccountInfo';
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useRef, useState } from 'react';

const SideBar = () => {
  const [isOpenSearch, setSearchStatus] = useState(false);
  const [usersElements, setSetUsersElements] = useState<React.ReactNode>();
  let usersData: DocumentData[] = [];
  const searchName = useRef<HTMLInputElement>(null);

  const submitSearch: React.KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key == 'Enter' && searchName.current) {
      const userRef = collection(db, 'users');
      console.log(userRef);
      const q = query(userRef, where('nickname', '==', true));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userRef = collection(db, 'users');
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });

      let usersElementsTemp = usersData.map((user) => {
        return (
          <ContactItem
            key={user.uid}
            email={user.email}
            nickname={user.nickname}
            photoURL={user.photoURL}
            uid={user.uid}
          />
        );
      });
      setSetUsersElements(usersElementsTemp);
    };
    fetchData();
  }, []);
  return (
    <div className={style.search_wrapper}>
      <AccountInfo />
      <div className={style.toggle_search_menu_wrapper}>
        <button
          onClick={() => setSearchStatus((prev) => !prev)}
          className={style.toggle_search_menu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div
        className={style.search_menu}
        style={{ height: isOpenSearch ? '60%' : 0 }}
      >
        <div
          style={{ height: isOpenSearch ? '60px' : 0 }}
          className={style.search_field_wrapper}
        >
          <input
            style={{
              padding: isOpenSearch ? '0.5rem 0.5rem 0.5rem' : 0,
              height: isOpenSearch ? 30 : 0,
            }}
            ref={searchName}
            onKeyDown={(e) => submitSearch(e)}
            className={style.search_field}
            placeholder="Пошук"
            type="text"
            name=""
            id="search"
          />
        </div>
        {usersElements}
      </div>
      <div className={style.contacts_menu}>
        <ContactItem email={''} nickname={''} photoURL={''} uid={''} />
      </div>
    </div>
  );
};

export default SideBar;
