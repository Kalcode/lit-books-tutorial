# Section 3 - Setup Dependencies/Structure

## Setup

### Make `src` directory and `index.js` file

Make a folder inside `server` folder called `src` and create a file called `index.js`.
So the file would be `server/src/index.js`.


### Installing [babel](https://babeljs.io/docs/en/usage)

*Make sure you are inside `./server` folder*

```sh
yarn add --dev @babel/core @babel/cli @babel/preset-env @babel/node
yarn add @babel/polyfill
```

TODO: A description and link of what this package does.

### Installing Nodemon

*Make sure you are inside `./server` folder*

```sh
yarn add --dev nodemon
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
yarn add --dev eslint babel-eslint
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

Lets test out our app. run the command inside `server` folder `yarn dev`.

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

