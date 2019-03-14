# Section 22 Create React App

<!-- TOC -->

- [Section 22 Create React App](#section-22-create-react-app)
  - [Create React App](#create-react-app)
  - [Getting Started](#getting-started)
    - [Starting React](#starting-react)
    - [Learning React](#learning-react)
  - [Structure](#structure)
    - [Folders](#folders)
    - [Clean-up](#clean-up)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Create React App

We are going to start setting up the frontend. To do that we will be using [Create React App](https://github.com/facebook/create-react-app). This is a boilerplate for react. It already has [Babel](https://babeljs.io/), [React](https://reactjs.org/), [Webpack](https://webpack.js.org/), etc setup and is maintained by a lot on contributors.

## Getting Started

In your project folder, we called `litbooks` we will create our client. This folder should also have the folder `server`.

When you create the react side the folder should be

```
litbooks -
-- client
-- server
```

In the folder `litbooks` type the following command to create your `create-react-app`

```shell
npx create-react-app client
```

[npx](https://www.npmjs.com/package/npx) is included with npm 5.2 and up and has some advantages, [you can read more about npx here](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b), but for this it will try to run the script and automatically grab the npm package for us and run it.

### Starting React

Go into the folder `client` and type `npm run start`. The instructions after starting a new project with create-react-app suggests: `yarn start`. You can install and use yarn for this project, but this tutorial will continue to use `npm`.


The script will automatically start your browser, if it doesn't navigate to `localhost:3000`.

### Learning React

If you have zero experience with React I'd suggest starting with the [official tutorial](https://reactjs.org/tutorial/tutorial.html).

You can also dive in straight here but with zero experience it may get a bit bumpy.

## Structure

The project has `public` and `src` folders. `src` is where we will spend most of our time.` Public is a place to put assets we want direct like our `index.html` or even images.

`src` is the source code for the project before it gets [transpiled](https://en.wikipedia.org/wiki/Source-to-source_compiler).

### Folders

We will be using two basic structures to start. `pages` and `components`. `pages` is where our page for each route lives and `components` for the actual `components` we will be reusing in our app.

### Clean-up 

Go ahead and delete `App.test.js`, `App.css`, `index.css`, `logo.svg`, and if you aren't using `yarn` then delete `yarn.lock`.

Inside `App.js` lets get rid of most the code and replace it with a function.

```jsx
import React from 'react';

export default function App() {
  return (
    <div >
      Lit Books
    </div>
  )
}
```

Then inside `index.js` we need to remove the `index.css` import.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
```

## Next

At this point the app should be running and displaying `Lit Books` in the top left. We are going to setup the react router next.

## Committing to Git

```
git status
git add .
git commit -m "section 22 create react app"
```