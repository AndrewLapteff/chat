import React from 'react';
import style from './Serach.module.css';
import ContactItem from './ContactItem';

const Search: React.FC = () => {
  return (
    <div className={style.search_wrapper}>
      <input
        className={style.search_field}
        placeholder="Пошук"
        type="text"
        name=""
        id="search"
      />
      <div className={style.contacts_menu}>
        <ContactItem />
      </div>
    </div>
  );
};

export default Search;
