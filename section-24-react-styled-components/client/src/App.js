import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import Nav from './components/Nav';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes/>
      </div>
    </BrowserRouter>
  )
}
