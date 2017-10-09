import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import Home from '../Home';
import Commands from '../Commands';
import Status from '../Status';
import NotFound from '../NotFound';

import { Navigation } from '../../components';

// eslint-disable-next-line
injectGlobal`
  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: black;
    font-family: 'Raleway', sans-serif;
  }
  .center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/commands" exact component={Commands} />
          <Route path="/status" exact component={Status} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
