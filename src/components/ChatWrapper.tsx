import style from './ChatWrapper.module.css';
import SideBar from './SideBar/SideBar';
import Chat from './Chat/Chat';

const ChatWrapper: React.FC = () => {
  return (
    <div className={style.background}>
      <div className={style.content}>
        <div className={style.left_side}>
          <SideBar />
        </div>
        <div className={style.right_side}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
