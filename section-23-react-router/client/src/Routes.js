import React from 'react';
import { Route } from 'react-router-dom';

import Landing from './pages/Landing'
import Login from './pages/Login';

export default function Routes() {
  return (
    <main>
      <Route path='/' exact component={Landing} />
      <Route path='/login' exact component={Login} />
    </main>
  )
}