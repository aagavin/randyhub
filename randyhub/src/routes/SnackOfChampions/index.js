import React from 'react';
import Snack from '../../assets/snackofchampions.jpg';
import MenuDropdown from '../../common/MenuDropdown';
import styles from './style.module.scss';

const SnackOfChampions = () => (
  <>
    <MenuDropdown />
    <img className={`${styles.snack}`} alt="Snack of Champions." src={Snack} />
  </>
);

export default SnackOfChampions;
