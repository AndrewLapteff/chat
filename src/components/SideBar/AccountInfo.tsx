import { useContext } from 'react';
import { auth } from '../../firebase';
import style from './AccountInfo.module.css';
import { User, signOut } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';

const AccountInfo = () => {
  const { authedUser }: { authedUser: User } = useContext<any>(AuthContext);

  return (
    <div className={style.account_info_wrapper}>
      <div className={style.account_info}>
        <img
          className={style.account_avatar}
          src={`${authedUser.photoURL}`}
          height={65}
          width={65}
          alt="Оновіть сторінку"
        />
        <span className={style.account_nick}>{authedUser.displayName}</span>
      </div>
      <button onClick={() => signOut(auth)} className={style.logout_button}>
        Вийти
      </button>
    </div>
  );
};

export default AccountInfo;
