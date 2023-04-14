import { useState } from 'react';
import { IMessage } from './Input/Input';
import style from './Message.module.css';
import { useAuth } from '../../hooks/useAuth';

const Message = (props: IMessage) => {
  const [isMessageMy, setIsMessageMy] = useState<boolean | null>(null);
  const [img, setImg] = useState<JSX.Element>();
  const authedUser = useAuth();
  const date: Date = new Date(1000 * props.time.seconds);

  if (props.author == authedUser.displayName && isMessageMy == null) {
    setIsMessageMy(false);
  }
  if (props.author != authedUser.displayName && isMessageMy == null) {
    setIsMessageMy(true);
  }
  if (props.photo != '' && img == null) {
    setImg(<img style={{ borderRadius: '10px' }} src={`${props.photo}`}></img>);
  }

  const addZero = (input: number) => {
    return input < 10 ? '0' + input : input;
  };
  return (
    <div
      style={{ justifyContent: isMessageMy ? 'start' : 'end' }}
      className={style.message}
    >
      <div className={style.message_wrapper}>
        {img != null && img}
        <div className={style.text}>{props.text}</div>

        <span className={style.message_time}>
          {date.getHours()}:{addZero(date.getMinutes())}
        </span>
      </div>
    </div>
  );
};

export default Message;
