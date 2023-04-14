import ChatBar from './ChatBar';
import Messages from './Messages';
import style from './Chat.module.css';
import Input from './Input/Input';

const Chat: React.FC = () => {
  return (
    <div className={style.chat_wrapper}>
      <ChatBar />
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
