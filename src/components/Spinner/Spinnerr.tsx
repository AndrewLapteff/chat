import React from 'react';
import style from './Spinner.module.css';
const Spinner = () => {
  return (
    <div className={style.background}>
      <div className={style.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
