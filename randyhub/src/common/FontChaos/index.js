import React from 'react';
import { createGlobalStyle } from 'styled-components';

const FontChaos = (props) => {
  const {
    globalFont,
  } = props;

  const BrailleStyle = createGlobalStyle`
  * {
    font-family: Braille !important;
  }`;

  const DamgramStyle = createGlobalStyle`
  * {
    font-family: Damgram !important;
  }`;

  const AmericanCaptainStyle = createGlobalStyle`
  * {
    font-family: Mortina !important;
  }`;

  return (
    <>
      {globalFont === 3 && <BrailleStyle />}
      {globalFont === 2 && <DamgramStyle />}
      {globalFont === 1 && <AmericanCaptainStyle />}
    </>
  );
};

export default FontChaos;
