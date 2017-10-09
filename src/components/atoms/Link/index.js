import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(({ ...props }) => <NavLink {...props} />)`
  text-transform: uppercase;
  font-size: 12px;
  margin-left: 50px;
  font-style: normal;
  text-decoration: none;
  font-weight: 600;
  line-height: 100%;
  color: #a8acab;
  letter-spacing: 1px;
  &.active {
    color: #657575;
    &:hover {
      color: #657575;
      animation: none;
    }
  }
  &:hover {
    color: #787a7e;
    animation: fadeIn 0.5s ease-out;
  }
  @keyframes fadeIn {
    0% {
      color: #a8acab;
    }
    100% {
      color: #787a7e;
    }
  }
`;

const Link = ({ ...props }) => <StyledNavLink {...props} />;

export default Link;
