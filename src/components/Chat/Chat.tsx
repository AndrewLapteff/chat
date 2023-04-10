import ChatBar from './ChatBar';
import Messages from './Messages';
import style from './Chat.module.css';

const Chat: React.FC = () => {
  return (
    <div className={style.chat_wrapper}>
      <ChatBar />
      <Messages />
    </div>
  );
};

export default Chat;
