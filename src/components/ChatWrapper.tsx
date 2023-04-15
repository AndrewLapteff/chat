import style from './ChatWrapper.module.css';
import SideBar from './SideBar/SideBar';
import Chat from './Chat/Chat';
import SettingsMenu from './UI/SettingsMenu/SettingsMenu';

const ChatWrapper: React.FC = () => {
  return (
    <div className={style.background}>
      <SettingsMenu />
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
