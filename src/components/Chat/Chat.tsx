import ChatBar from './ChatBar/ChatBar';
import Messages from './Messages/Messages';
import style from './Chat.module.css';
import Input from './Input/Input';
import { useChatInfo } from '../../hooks/useChatInfo';

const Chat = () => {
  const { state } = useChatInfo();
  return (
    <div className={style.chat_wrapper}>
      <ChatBar />
      {state.chatId && <Messages chatId={state.chatId} />}
      {state.chatId && <Input />}
    </div>
  );
};

export default Chat;
