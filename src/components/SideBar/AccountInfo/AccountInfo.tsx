import style from './AccountInfo.module.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

const AccountInfo = () => {
  const authedUser = useAuth();
  const { t, i18n } = useTranslation();
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
        {t('quit btn')}
      </button>
    </div>
  );
};

export default AccountInfo;
