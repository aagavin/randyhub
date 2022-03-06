import React from 'react';
import MenuDropdown from '../../common/MenuDropdown';
import styles from './styles.module.scss';

const AuroraWatch = () => {
  const style = { border: '0px' };
  return (
    <>
      <MenuDropdown />
      <div className={`${styles['aurora-watch']}`}>
        <a href="http://www.aurorawatch.ca/">
          <img
            style={style}
            alt="Auroral forecast from AuroraWatch.ca"
            width="168"
            height="145"
            src="http://www.aurorawatch.ca/widget.php"
          />
        </a>
        <div>
          Source: Aurora watch (click to go to)
        </div>
      </div>
    </>
  );
};

export default AuroraWatch;
