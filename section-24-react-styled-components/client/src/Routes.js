import React from 'react';
import { Route } from 'react-router-dom';

import styled from 'styled-components'

import Landing from './pages/Landing'
import Login from './pages/Login';

const Main = styled.main`
  padding: 20px 0;
`

export default function Routes() {
  return (
    <Main>
      <Route path='/' exact component={Landing} />
      <Route path='/login' exact component={Login} />
    </Main>
  )
}