import React from 'react';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components'

import BMxLoginSplash from '../assets/images/bmx-login-splash.png';
import BMxLogoTransparent from '../assets/images/bmx-logo-transparent.png';

const LeftHero = styled(Col)`
  background: url(${BMxLoginSplash}) no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
`;

function Left(props) {
  return (
    <LeftHero className={props.className} md={4} lg={6}>
      <Image src={BMxLogoTransparent} fluid className="align-self-end mb-5" />
    </LeftHero>
  );
}

export default Left;
