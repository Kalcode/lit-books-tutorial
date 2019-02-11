# Section 4.1 Setting up environment variables

<!-- TOC -->

- [Section 4.1 Setting up environment variables](#section-41-setting-up-environment-variables)
  - [What are environment variables?](#what-are-environment-variables)
    - [Replacing `port`:](#replacing-port)
    - [Local `.env`](#local-env)
    - [Setting up your env](#setting-up-your-env)
    - [Changing out the variables](#changing-out-the-variables)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## What are environment variables?

[Environment variables](https://en.wikipedia.org/wiki/Environment_variable) are used when certain variables need to change from one environment to another. An example is running the server locally on your machine versus running it on a production server. The server may need to connect to a database that isn't on your local machine, or use different ports. 

Other times we use environment variables to protect variables that shouldn't be shared in the code. These can be access keys to APIs or passwords to databases.

### Replacing `port`:

In our code earlier we had the following:

```js
const port = 4000; 

app.listen({ port }, () => {
  console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
});
```

Here we pass the variable `port` to the express app for it to listen on `localhost` on port `4000`. This isn't very flexible when it comes to deploying on other servers. We'd have to change the code BEFORE we use it on a server, then change the code again when we use it locally.

In some cases the `port` that we are required to use on the production server can change from deployment to deployment.

This is an excellent case for use to change out the port variable for an environment variables

### Local `.env`

There are several ways to use environment variables locally. We can set the systems (OS) variables, we can also create a file that we use only during local or non-production. 

The more common way is to set `process.env` to hold our variables. [`provess.env` is a node](https://nodejs.org/api/process.html#process_process_env) Object. It exists on the object `process`.

Node process usually holds your user environment variables which also includes your systems variables.

This is a great place to put them as any server that sets the system environment variables should also be accessible via `process.env`.

In `nodejs` we will use a npm package called [dotenv](https://github.com/motdotla/dotenv).

Let add this package

```
npm add dotenv
```

This package allows us to create a file called `.env` and set variables there. This way we can isolate our environment variables from the rest of our code and just swap out one file for different systems.

Create the `.env` file at the root of the `server` folder, so `litbooks/server/.env`

After creating the file, make sure our `.gitignore` in the server folder has `.env` the `.gitignore` file should look like

```
node_module
dist
.env
```

Check the file against the section file here: [litboots/server/.gitignore](./server/.gitignore)

Inside the `.env` file, add the following line:

```
PORT=4000
```

Its convention to user all uppercases here.

### Setting up your env

Inside the top of your `index.js` of your server folder add the following line

```js
import 'dotenv/config'
```

The package will look for a file called `.env` at the root of the `package.json` it is called in. Here that would be `server` folder.

Reference the file [index.js](./server/src/index.js)

### Changing out the variables

Inside your `index.js` change the `const port = 4000` line to the follow

```js
const { PORT } = process.env; 
```

you could also do

```js
const port  = process.env.port;
``` 

We used object [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) in the first example. 

Now if you run `npm run dev` you should a similar output:

```sh
[nodemon] 1.18.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node src`
GraphQL Server ready at http://localhost:4000/graphql
```

If you change the `.env` file from say `4000` to `3000` and restart the server you should see `http://localhost:4000/graphql` change to `http://localhost:3000/graphql`

For now lets keep it at `4000`

Congratulation, we have our express and graphql server working.

## Committing to Git

```
git status
git add .
git commit -m "section 4.1 enviornment variables"
```