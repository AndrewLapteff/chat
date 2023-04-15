import style from './SideBar.module.css';
import Search from './Search/Search';
import AccountInfo from './AccountInfo/AccountInfo';
import Contacts from './Contacts/Contacts';

export interface ISearchedUser {
  displayName: string;
  photoURL: string;
  uid: string;
  date: number;
  lastMessage?: string;
}

const SideBar = () => {
  return (
    <div className={style.sidebar_wrapper}>
      <AccountInfo />
      <div className={style.search_wrapper}>
        <Search />
      </div>
      <Contacts />
    </div>
  );
};

export default SideBar;
