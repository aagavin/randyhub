import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import Curtain from './component/Curtain';

const Main = () => (
  <div className={`${styles.body}`}>
    <h1 className={`${styles.title}`}>
      RANDYHUB
    </h1>
    <h2 className={`${styles.subtitle}`}>
      sponsored by chaos chat
    </h2>
    <Curtain />
    <div className={`${styles.links}`}>
      <h3>
        Content
      </h3>
      {' '}
      &#8260;
      <Link to="/snack-of-champions">The Snack of Champions</Link>
      <br />
      {' '}
      &#8260;
      <Link to="/covid-counter">Covid Counter</Link>
      <br />
      {' '}
      &#8260;
      <Link to="/cooking-with-randy">Cooking with Randy</Link>
      <br />
      {' '}
      &#8260;
      <Link to="/git-repo">Randy Hub repo info</Link>
      <br />
      {' '}
      &#8260;
      <Link to="/aurora-watch">Aurorawatch</Link>
      <br />
      {' '}
      &#8260;
      <Link to="/movies-with-randy">Movies with Randy</Link>
    </div>
  </div>
);
export default Main;
