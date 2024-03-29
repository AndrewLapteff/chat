import {
  DocumentData,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { loader } from '../../UI/loader';
import style from './Search.module.css';
import ContactItem from '../ContactItem/ContactItem';
import { useAuth } from '../../../hooks/useAuth';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const [isOpenSearch, setSearchStatus] = useState(false);
  const [usersElements, setSetUsersElements] = useState<React.ReactNode>();
  let usersData: DocumentData[] = [];
  const [searchName, setSearchName] = useState<string>('');
  const [searchedUser, setSearchedUser] = useState<React.ReactNode | null>(
    null
  );
  const [isLoading, setStatusLoading] = useState<boolean>(false);
  const authedUser = useAuth();
  const { t, i18n } = useTranslation();

  const clearSearch = () => {
    setSearchName('');
    setSearchedUser(null);
  };

  // всі запит на всих юзерів
  useEffect(() => {
    const fetchData = async () => {
      const userRef = collection(db, 'users');
      const q = query(
        userRef,
        where('displayName', '!=', authedUser.displayName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });

      let usersElementsTemp = usersData.map((user) => {
        return (
          <ContactItem
            date={0}
            key={user.uid}
            displayName={user.displayName}
            photoURL={user.photoURL}
            uid={user.uid}
          />
        );
      });
      setSetUsersElements(usersElementsTemp);
    };
    fetchData();
  }, []);

  // запит на конкретного юзера
  useEffect(() => {
    if (searchName) {
      if (searchedUser) {
        setSearchedUser(null);
      }
      const getQuery = setTimeout(async () => {
        setStatusLoading(false);
        const userRef = collection(db, 'users');
        const q = query(userRef, where('displayName', '==', searchName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let tempUser = (
            <div style={{ width: '100%' }} onClick={() => clearSearch()}>
              <ContactItem
                date={0}
                displayName={doc.data().displayName}
                photoURL={doc.data().photoURL}
                uid={doc.data().uid}
              />
            </div>
          );
          setSearchedUser(tempUser);
        });
      }, 300);
      setStatusLoading(true);
      return () => {
        setStatusLoading(false);
        clearTimeout(getQuery);
      };
    }
  }, [searchName]);

  return (
    <div className={style.search_wrapper}>
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
        style={{
          height: isOpenSearch ? '300px' : 0,
          borderBottom: isOpenSearch ? '1px solid rgb(197, 197, 227)' : 'none',
        }}
      >
        <div className={style.search_field_wrapper}>
          <input
            autoComplete="off"
            onChange={(e) => setSearchName(e.target.value)}
            className={style.search_field}
            placeholder={t('search')}
            type="text"
            name="search"
            id="search"
            value={searchName}
          />
        </div>
        <div
          style={{
            marginBottom: isOpenSearch ? '0' : -200,
            transition: 'all 200ms ease-in-out',
          }}
          className={style.contacts_wrapper}
        >
          {searchName && !searchedUser && isLoading ? loader : searchedUser}
          {!searchName && !searchedUser && !isLoading ? usersElements : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
