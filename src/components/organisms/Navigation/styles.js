import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 75px;
  border-bottom: 2px solid #8ab5d7;
  background-color: white;
`;

export const Logo = styled.div`
  grid-column: 2/4;
  grid-row: 1;
  align-self: center;
  > img {
    height: 50px;
    margin-right: 20px;
    vertical-align: middle;
    @media (max-width: 920px) {
      height: 42px;
    }
    @media (max-width: 620px) {
      height: 35px;
    }
  }
  > span {
    font-family: 'Roboto', sans-serif;
    color: #c0c4c9;
    font-weight: 600;
    letter-spacing: 2px;
    vertical-align: sub;
    @media (max-width: 820px) {
      font-size: 0.9em;
    }
    @media (max-width: 780px) {
      font-size: 0.8em;
    }
  }
  @media (max-width: 780px) {
    grid-column: 2/5;
  }
  @media (max-width: 480px) {
    grid-column: 2/6;
  }
  @media (max-width: 360px) {
    grid-column: 2/7;
  }
`;

export const Nav = styled.div`
  grid-column: 6/10;
  grid-row: 1;
  justify-self: end;
  align-self: center;
  > a {
    font-size: 0.75em;
    @media (max-width: 620px) {
      font-size: 0.7em;
    }
  }
  @media (max-width: 620px) {
    display: none;
  }
`;

export const MenuWrapper = styled.div`
  grid-column: 10/12;
  grid-row: 1;
`;
