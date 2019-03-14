# Section 23 React Router

<!-- TOC -->

- [Section 23 React Router](#section-23-react-router)
  - [React Router](#react-router)
    - [Installing](#installing)
    - [Hooking it up](#hooking-it-up)
    - [Pages](#pages)
    - [Routes](#routes)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## React Router

For our apps router we [will use `react-router`](https://reacttraining.com/react-router/web/guides/quick-start). React router is a pretty popular and simple to use router.

### Installing

To install navigate to the client folder `client` and type `npm install react-router-dom`

### Hooking it up

We will wrap our code in the `Router` provider. In the `App.js` 

```jsx
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  )
}
```

Then we need to create the component called `Routes`. This is where all our routes for our pages will live.

### Pages

We want to create some pages to hook up. So create a folder inside `src` called `pages` and create two files, `Landing.js` and `Login.js`.

Inside those files

`client/src/Landing.js`
```jsx
import React from 'react';

export default function Landing() {
  return (
    <div>
      Lit Books -  Landing Page Works!
    </div>
  )
}
```

`client/src/Login.js`
```jsx
import React from 'react';

export default function Login() {
  return (
    <div>
      Login Works!
    </div>
  )
}
```

### Routes

Create a file called `Routes.js` under `src`

`client/src/Routes,js`
```jsx
import React from 'react';
import { Route } from 'react-router-dom';

import Landing from './pages/Landing'
import Login from './pages/Login';

export default function Routes() {
  return (
    <main>
      <Route path='/' exact component={Landing} />
      <Route path='/login' component={Login} />
    </main>
  )
}
```

## Next

You can now navigate to `http://localhost:3000` and `http://localhost:3000/login` and see the two different messages.

Next we will add our `styled-components`

## Committing to Git

```
git status
git add .
git commit -m "section 23 react router"
```