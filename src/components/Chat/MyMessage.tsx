import style from './MyMessage.module.css';

const MyMessage = () => {
  return (
    <div className={style.message}>
      <div className={style.message_wrapper}>
        <div className={style.text}>
          ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        </div>
        <span className={style.message_time}>20:34</span>
      </div>
    </div>
  );
};

export default MyMessage;
