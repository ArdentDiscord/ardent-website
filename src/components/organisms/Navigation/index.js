import React from 'react';
import { Link } from '../..';

import LogoImage from './assets/logo.png';
import { Container, Logo, Nav, MenuWrapper } from './styles';

const Navigation = () => (
  <Container>
    <Logo>
      <img src={LogoImage} alt="Ardent Logo" />
      <span>ARDENT</span>
    </Logo>
    <Nav>
      <Link exact to="/">
        Home
      </Link>
      <Link exact to="/commands">
        Commands
      </Link>
      <Link exact to="/status">
        Status
      </Link>
    </Nav>
    <MenuWrapper />
  </Container>
);

export default Navigation;
