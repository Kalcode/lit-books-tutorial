# Section 5.1 Server Refactor Index

<!-- TOC -->

- [Section 5.1 Server Refactor Index](#section-51-server-refactor-index)
  - [Refactoring](#refactoring)
    - [Server Start Function](#server-start-function)
  - [Separating the connect function.](#separating-the-connect-function)
    - [ENV the database variables](#env-the-database-variables)
    - [Deprecation warning](#deprecation-warning)
    - [Database string and console log](#database-string-and-console-log)
    - [Connecting again](#connecting-again)
    - [Bring together the mongoose connection function](#bring-together-the-mongoose-connection-function)
  - [Separating the graphql connection.](#separating-the-graphql-connection)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Refactoring

Currently [server/src/index.js](./server/src/index.js) is a getting a little disorganized. Now is an opportunity to organize our code a bit.

We will group two area of the code, the database setup, mongoose, and the graphql, Apollo, setup.

### Server Start Function

First we will create a function inside `./server/src/index.js` called `start` that will start our server by creating express, connecting to the database and creating the graphql server.

inside `./server/src/index.js` right above the mongoose we will create an async function called `start`

```js
// new code here
async function start() {

}

// Connect to mongoDB here
mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Connected to MongoDB');
  });
```

The async function will allow us to use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). Mongoose connect function is a promise that we can use await for.

Move the rest of the code below `start` inside start

```js
async function start() {
  // Connect to mongoDB here
  mongoose
    .connect('mongodb://localhost:27017')
    .then(() => {
      console.log('Connected to MongoDB');
    });

  const app = express();

  app.get('/', (req, res) => {
    return res.send('Root Route');
  });


  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  graphqlServer.applyMiddleware({ app }); 

  const { PORT } = process.env; 

  app.listen({ port }, () => {
    console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
  });
}
```

After the function lets call it

```js
  app.listen({ port }, () => {
    console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
  });
}

// call it here
start()
```

## Separating the connect function.

Create a folder inside `src` called `db`. Then a filed inside there called `connect.js`

`server/src/db/connect.js`

Inside there we will create another async function called `connect`, add the following to the new file.

```js
// inside connect.js
import mongoose from 'mongoose';

export async function connect() {
  const { DB_URL, DB_NAME } = process.env;

  const uri = `${DB_URL}/${DB_NAME}`;

  await mongoose.connect(uri, { useNewUrlParser: true });

  console.log(`Connected to MongoDB: ${uri}`);
}
```

### ENV the database variables

as you can see in our new file we changed a bit. We need to get our connection string from out `.env` file. We need create the variables  `DB_URL` and `DB_NAME`.

Open your `.env` file inside `server/.env` and add the following lines

```sh
PORT=4000
# database variables
DB_URL=mongodb://localhost:27017
DB_NAME=litbooks
```

### Deprecation warning

Mongoose might be throwing an deprecation warning 

```sh
DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
```

We have added `{ useNewUrlParser: true }` to our connection string. With it, we need to specify a database name, we will call it `litbooks`.


### Database string and console log

This is a name to our specific database. The server that handles the database is at `localhost:27017`, but we can have multiple databases, to distinguish our we have to give it a name to connect to it.

```js
 const uri = `${DB_URL}/${DB_NAME}`;
```

This is the base of our connection string, its the `mongodb://localhost:27017` with the database name `litbooks`, which using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) creates `mongodb://localhost:27017/litbooks`


### Connecting again

Now we use await to connect to mongoose and a wait its connection.

```js
await mongoose.connect(uri, { useNewUrlParser: true });
```

after its done we output to the console to let us know we are connected.

```js
console.log(`Connected to MongoDB: ${uri}`);
```

### Bring together the mongoose connection function

Since we exported the function we can import it into our `server/src/index.js`

import it at the top

```js
import { connect } from './db/connect';
```

replace mongoose connect with the new function

```js
async function start() {
  // Connect to mongoDB here
  mongoose
    .connect('mongodb://localhost:27017')
    .then(() => {
      console.log('Connected to MongoDB');
    });
```

replace with

```js
async function start() {
  
  await connect();
```

This will call our async function connect, create our connection string from the `.env` file, pass it to `mongoose.connect` and then after that `Promise` resolved using `await` we print we are connected.


## Separating the graphql connection.

This will be more straight forward. Create a new file inside the `graphql` folder called `createApollo.js`.

`litbooks/server/src/graphql/createApollo.js`

We will take the code inside `src/index.js` that creates the Apollo server and put it inside a function in the new file `createApollo.js`

```js
import { ApolloServer } from 'apollo-server-express';

// change these imports to their individual files
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs'; 

export function createApollo(app) {
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  graphqlServer.applyMiddleware({ app }); 

  return graphqlServer;
}
```

You can now delete the `index.js` file we had inside `graphql` as we will now import `resolbers` and `typeDefs` separately.

Your `server/src/index.js` files should be cleaned up now. Deleting the code no longer used.

Your `start` function inside `index.js` should look like the file below:

```js
import 'dotenv/config';
import express from 'express';

import { createApollo } from './graphql/createApollo';
import { connect } from './db/connect';

async function start() {
  const app = express();

  await connect();

  const graphqlServer = createApollo(app);

  app.get('/', (req, res) => {
    return res.send('Root Route');
  });

  const { PORT } = process.env; 

  app.listen({ port }, () => {
    console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
  });
}
```

## Committing to Git

```
git status
git add .
git commit -m "section 5.1 server refactor index"
```