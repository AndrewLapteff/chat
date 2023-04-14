import style from './Messages.module.css';
import Message from './Message';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useChatInfo } from '../../hooks/useChatInfo';
import { useAuth } from '../../hooks/useAuth';
import { IMessage } from './Input/Input';

const Messages = () => {
  const { state } = useChatInfo();
  const authedUser = useAuth();
  const [messages, setMessages] = useState<JSX.Element[]>();
  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, 'chats', state.chatId), (doc) => {
        let data = doc.data();

        if (data != undefined) {
          let temp: JSX.Element[] = data.messages.map((message: IMessage) => {
            return (
              <Message
                key={message.id}
                time={message.time}
                author={message.author}
                text={message.text}
                photo={message.photo}
              />
            );
          });
          setMessages(temp);
        }
      });

      return () => unsub();
    };

    state.chatId && getMessages();
  }, [state.chatId]);
  return <div className={style.messages_wrapper}>{messages}</div>;
};

export default Messages;
