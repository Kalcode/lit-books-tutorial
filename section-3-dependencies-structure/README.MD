# Section 3 - Setup Dependencies/Structure

<!-- TOC -->

- [Section 3 - Setup Dependencies/Structure](#section-3---setup-dependenciesstructure)
  - [Setup](#setup)
    - [Make `src` directory and `index.js` file](#make-src-directory-and-indexjs-file)
    - [Installing [babel](https://babeljs.io/docs/en/usage)](#installing-babelhttpsbabeljsiodocsenusage)
    - [Installing Nodemon](#installing-nodemon)
    - [Configure `.babelrc`](#configure-babelrc)
    - [Installing Eslint](#installing-eslint)
    - [Configure Eslint](#configure-eslint)
    - [Add dev script](#add-dev-script)
    - [Console Log](#console-log)
    - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Setup

### Make `src` directory and `index.js` file

Make a folder inside `server` folder called `src` and create a file called `index.js`.
So the file would be `server/src/index.js`.


### Installing [babel](https://babeljs.io/docs/en/usage)

*Make sure you are inside `./server` folder*

```sh
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
npm install @babel/polyfill
```

TODO: A description and link of what this package does.

### Installing Nodemon

*Make sure you are inside `./server` folder*

```sh
npm install --save-dev nodemon
```

TODO: A description and link of what this package does.

### Configure `.babelrc`

Add `.babelrc` to the root of `server` folder. So `server/.babelrc`

Add the content to file

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

TODO: A description and link of what this file does.

### Installing Eslint

```sh
npm install --save-dev eslint babel-eslint
```

### Configure Eslint

Add `.eslintrc` to the root of `server` folder. So `server/.eslintrc`

Add the content to file

```json
{
  "parser": "babel-eslint",
  "parserOptions": {
		"ecmaVersion": 8
	},
  "extends": "eslint:recommended",
  "rules": {
    "no-console": "off",
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "strict": 0
  }
}
```

TODO: A description and link of what this file does.

### Add dev script

In `package.json` in the `server` directory, `server/package.json` add the following under `scripts`;

`"dev": "nodemon src --exec babel-node",`

`package.json` scripts should look like

```json
{
  "scripts": {
    "dev": "nodemon src --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

Refer to [package.json](server/package.json) of this section for complete example.

### Console Log

Lets test out our app. run the command inside `server` folder `npm run dev`.

Your console should output

```sh
$ nodemon src --exec babel-node
[nodemon] 1.18.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node src`
Hello World
[nodemon] clean exit - waiting for changes before restart
```
The `Hello World` is a good sign things are connected properly.

### Committing to Git

In your terminal type

```
git status
git add .
git commit -m "Section 3 setting up dependencies and structure"
```

