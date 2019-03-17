import React, { Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Normalize } from 'styled-normalize'

import Routes from './Routes';
import Nav from './components/Nav';
import { GlobalStyle } from './components/Global/GlobalStyle';

export default function App() {
  return (
    <Fragment>
      <Normalize />
      <GlobalStyle />
      <BrowserRouter>
        <Fragment>
          <Nav />
          <Routes/>
        </Fragment>
      </BrowserRouter>
    </Fragment>
  )
}
