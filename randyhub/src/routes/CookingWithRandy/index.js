import React from 'react';
import MenuDropdown from '../../common/MenuDropdown';
import styles from './styles.module.scss';
import CustomCursor from '../../common/CustomCursor';

const CookingWithRandy = () => (
  <>
    <CustomCursor />
    <MenuDropdown />
    <div className={`${styles['cooking-with-randy']}`}>
      <h1>Cooking with Randy</h1>
      <p>
        In the middle of an online game that you can&apos;t pause?
        <br />
        Perhaps you only have 30 seconds in between respawn timers?
        <br />
        Need sustenance for your gamer bod?
        <br />
        Look no further than this simple recipe
        <br />
        <br />
        Ingredients:
        <ul>
          <li>Instant Mashed Potatoes </li>
          <li className={`${styles.italics}`}>Literally nothing else</li>
        </ul>
        <br />
        Steps:
        <ol>
          <li>Open box of instant mashed potatoes</li>
          <li>Open packet of instant mashed potatoes</li>
          <li>Pour into gamer mouth</li>
          <li>Respawn and return to your gaming</li>
        </ol>
      </p>
    </div>
  </>
);

export default CookingWithRandy;
