import React from 'react';
import style from './ChatWrapper.module.css';
import Search from './Search/Search';
import Chat from './Chat/Chat';

const ChatWrapper: React.FC = () => {
  return (
    <div className={style.background}>
      <div className={style.content}>
        <div className={style.left_side}>
          <Search />
        </div>
        <div className={style.right_side}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
