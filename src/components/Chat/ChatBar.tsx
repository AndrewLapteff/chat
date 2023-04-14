import style from './ChatBar.module.css';
import { useChatInfo } from '../../hooks/useChatInfo';

const ChatBar = () => {
  const { state } = useChatInfo();

  const defautImg: React.ReactEventHandler<HTMLImageElement> | undefined = (
    e
  ) => {
    if (state.chatId != '') {
      e.currentTarget.src =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7eMS1cDRE1KTr0o7sXBUojGRtrHZeAWKZ7I8KZc8gREJsX6RVmp5Mc3i4iWX_rbXax04&usqp=CAU';
    } else {
      e.currentTarget.src =
        'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'; // transperent
    }
  };

  return (
    <div className={style.chatbar_wrapper}>
      <img
        className={style.contact_icon}
        height={65}
        width={65}
        src={`${state.chatInfo?.photoURL}`}
        alt="Avatar"
        onError={(e) => defautImg(e)}
      />
      <span className={style.contact_displayName}>
        {state.chatInfo?.displayName}
      </span>
    </div>
  );
};

export default ChatBar;
