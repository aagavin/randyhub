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
        <div className={`${styles.links}`}>
          <h3>
            Content
          </h3>
          <div>
            {' '}
            &#8260;
            <Link
              to="/"
              onClick={() => toggleDropdown()}
              onKeyPress={() => toggleDropdown()}
            >
              Main
            </Link>
          </div>
          <div>
            {' '}
            &#8260;
            <Link
              to="/snack-of-champions"
              onClick={() => toggleDropdown()}
              onKeyPress={() => toggleDropdown()}
            >
              The Snack of Champions
            </Link>
          </div>
          <div>
            {' '}
            &#8260;
            <Link
              to="/covid-counter"
              onClick={() => toggleDropdown()}
              onKeyPress={() => toggleDropdown()}
            >
              Covid Counter
            </Link>
          </div>
          <div>
            {' '}
            &#8260;
            <Link
              to="/cooking-with-randy"
              onClick={() => toggleDropdown()}
              onKeyPress={() => toggleDropdown()}
            >
              Cooking with Randy
            </Link>
          </div>
          <div>
            {' '}
            &#8260;
            <Link
              to="/git-repo"
              onClick={() => toggleDropdown()}
              onKeyPress={() => toggleDropdown()}
            >
              Randy Hub repo info
            </Link>
          </div>
          <div>
            {' '}
            &#8260;
            <Link
              to="/aurora-watch"
              onClick={() => toggleDropdown()}
              onKeyPress={() => toggleDropdown()}
            >
              Aurorawatch
            </Link>
          </div>
          <div>
            {' '}
            &#8260;
            <Link
              to="/movies-with-randy"
              onClick={() => toggleDropdown()}
              onKeyPress={() => toggleDropdown()}
            >
              Movies with Randy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDropdown;
