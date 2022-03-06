import {
  gsap,
} from 'gsap';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const MenuDropdown = () => {
  const [toggle, setToggle] = useState(false);
  const isInitialMount = useRef(true);
  const menu = useRef(null);

  const toggleDropdown = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (toggle) {
      gsap.to(menu.current, {
        opacity: 1,
        duration: 1,
        top: 0,
      });
    } else {
      gsap.to(menu.current, {
        opacity: 0,
        duration: 1,
        top: '-100vh',
      });
    }
  }, [toggle]);

  return (
    <>
      <button
        type="button"
        className={`${styles['btn-menu']}`}
        onClick={() => toggleDropdown()}
        onKeyPress={() => toggleDropdown()}
      >
        ☰
      </button>
      <div ref={menu} className={`${styles.dropdown}`}>
        <button
          type="button"
          className={`${styles['btn-exit']}`}
          onClick={() => toggleDropdown()}
          onKeyPress={() => toggleDropdown()}
        >
          X
        </button>
        <div className={`${styles.body}`}>
          <p><b>Projects</b></p>
          <div className={`${styles.link}`}><Link to="/">Main</Link></div>
          <div className={`${styles.link}`}><Link to="/snack-of-champions">The Snack of Champions</Link></div>
          <div className={`${styles.link}`}><Link to="/covid-counter">Covid Counter</Link></div>
          <div className={`${styles.link}`}><Link to="/cooking-with-randy">Cooking with Randy</Link></div>
          <div className={`${styles.link}`}><Link to="/git-repo">Randy Hub repo info</Link></div>
          <div className={`${styles.link}`}><Link to="/aurora-watch">Aurorawatch</Link></div>
          <div className={`${styles.link}`}><Link to="/movies-with-randy">Movies with Randy</Link></div>
        </div>
      </div>
    </>
  );
};

export default MenuDropdown;
