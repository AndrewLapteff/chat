import { changeLanguage } from 'i18next';
import style from './SettingsMenu.module.css';
import { useState } from 'react';

function SettingsMenu() {
  const [isLocaleMenuOpen, setStatusOfLocMenu] = useState(false);
  return (
    <div className={style.menu}>
      <div>
        <svg
          onClick={() => setStatusOfLocMenu((prev: any) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          id="globe"
        >
          <path
            fillRule="evenodd"
            d="M16 2C8.55 2 2.5 8.05 2.5 15.5S8.55 29 16 29c.53 0 1.051-.038 1.566-.098l.016.016.018-.02c6.696-.793 11.9-6.49 11.9-13.398 0-6.907-5.204-12.6-11.898-13.395-.017-.014-.032-.03-.05-.044v-.006l-.03.037C17.021 2.035 16.514 2 16 2zm-.5 1.025V8h-4.34c.917-1.943 2.174-3.628 3.676-4.941.219-.02.442-.025.664-.034zm1 0c.223.01.447.013.666.034C18.671 4.372 19.931 6.054 20.85 8H16.5V3.025zm-3.424.332A16.524 16.524 0 0 0 10.046 8H6.015a12.476 12.476 0 0 1 7.062-4.643zm5.846 0A12.475 12.475 0 0 1 25.986 8H21.96a16.516 16.516 0 0 0-3.037-4.643zM5.336 9h4.31a18.744 18.744 0 0 0-1.132 6H3.525a12.416 12.416 0 0 1 1.81-6zm5.402 0H15.5v6H9.514a17.63 17.63 0 0 1 1.224-6zM16.5 9h4.77a17.624 17.624 0 0 1 1.224 6H16.5V9zm5.86 0h4.304a12.416 12.416 0 0 1 1.81 6h-4.98a18.743 18.743 0 0 0-1.135-6zM3.524 16h4.989a18.74 18.74 0 0 0 1.132 6H5.334a12.421 12.421 0 0 1-1.809-6zm5.989 0H15.5v6h-4.762a17.631 17.631 0 0 1-1.224-6zm6.986 0h5.969c-.106 1.883-.62 3.953-1.518 6H16.5v-6zm6.97 0h5.005a12.421 12.421 0 0 1-1.809 6h-4.629c.843-2.03 1.336-4.084 1.434-6zM6.015 23h4.033a16.525 16.525 0 0 0 3.03 4.643A12.472 12.472 0 0 1 6.013 23zm5.146 0h4.34v4.975c-.221-.01-.444-.014-.662-.034-1.504-1.313-2.76-2.996-3.678-4.941zm5.34 0h3.963a22.127 22.127 0 0 1-3.363 4.945c-.198.018-.4.022-.6.03V23zm5.088 0h4.398a12.473 12.473 0 0 1-7.379 4.725A23.26 23.26 0 0 0 21.587 23z"
            color="#000"
            enableBackground="accumulate"
            fontFamily="sans-serif"
            fontWeight="400"
            overflow="visible"
          ></path>
        </svg>
        <div>
          <div
            style={{
              display: isLocaleMenuOpen ? 'block' : 'none',
            }}
          >
            <img
              onClick={() => {
                setStatusOfLocMenu((prev) => !prev);
                changeLanguage('ua');
              }}
              className={style.item}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1200px-Flag_of_Ukraine.svg.png"
              height={20}
              width={25}
              alt=""
            />
          </div>
          <div
            style={{
              display: isLocaleMenuOpen ? 'block' : 'none',
            }}
          >
            <img
              onClick={() => {
                setStatusOfLocMenu((prev) => !prev);
                changeLanguage('en');
              }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_the_United_Kingdom.png/1200px-Flag_of_the_United_Kingdom.png?20080216232030"
              height={20}
              width={25}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
