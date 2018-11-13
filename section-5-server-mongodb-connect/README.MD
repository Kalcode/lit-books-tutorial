# Section 5 MongoDB Connect
<!-- TOC -->

- [Section 5 MongoDB Connect](#section-5-mongodb-connect)
  - [Connecting to MongoDB](#connecting-to-mongodb)
      - [Windows/Linux](#windowslinux)
      - [Mac/OSX:](#macosx)
      - [Troubleshooting](#troubleshooting)
  - [Installing Mongoose](#installing-mongoose)
    - [Installing Mongoose](#installing-mongoose-1)
  - [Connecting to the database](#connecting-to-the-database)

<!-- /TOC -->

## Connecting to MongoDB

Refer back to [Section 2.2 - Running MongoDB](../section-2.2-running-mongodb/README.MD) to make sure your mongo is running. Your MongoDB instance must be started before you can connect to it.

#### Windows/Linux

In general for windows or linux it runs as a service. The service should be started prior to attempting to connect. Both set-up typically have the service start when the system/os is started. 

#### Mac/OSX:

For Mac usually the instance must be started via a command `mongod` and a terminal window left open.

*In Visual Studio Code a new terminal can be opened and used for your mongodb instance*

#### Troubleshooting

We won't go in-depth into the nuances of setting up and running mongo. There are plenty of resources on the internet to find how to resolve most issues. Or how to get an instance of it running on your ststem. Feel free to open an issue on Github though to also seek help in resolving them.

## Installing Mongoose

Mongoose is one of the most popular packages used in interacting with MongoDB because it allows us to model our database using schemas.

[Mongoose](https://mongoosejs.com/) is a ORM (Object Relational Mapper), more accurately a ODM (Object Document Mapper). 

The difference is primarily in [SQL vs NoSQL](https://www.mongodb.com/nosql-explained). You can [read more about NoSQL here.](https://www.mongodb.com/nosql-explained)

Mongoose maps the documents we store inside MongoDB to objects in javascript. Mongoose is built on the [mongoddb](http://mongodb.github.io/node-mongodb-native/) driver. The driver is used to connect and interact with MongoDB via javascript. Mongoose allows us to model those documents by mapping them to a schema we define. Mongoose also provides migration to handle changes in our models.

### Installing Mongoose

Make sure you are in the `server` folder before running the command in terminal. 

path: `litbooks/server`

command:

```sh
npm install mongoose
```

This will update our [package.json](./server/package.json) with the new dependency `mongoose`. 

## Connecting to the database

The MongoDB instance should be running as specified above and we can now connect to it.

inside `server/src/index.js` we need to import `mongoose`;

after 

```js
import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
```

import mongoose

```js
import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose'; // Add this line
```

Below the last import we will connect to mongoDB. After the import:

```js
import { typeDefs, resolvers } from './graphql';

```

Add:

```js
import { typeDefs, resolvers } from './graphql';

// Add mongoose connection
mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Connected to MongoDB');
  });
```

first we call the library `mongoose`'s method [`connect`](https://mongoosejs.com/docs/4.x/docs/api.html#index_Mongoose-connect), which returns  a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). So we chain a `then` after the promise is complete to print that it was sucessful.

Now when we start the server you will get a message similar below:

```sh
GraphQL Server ready at http://localhost:4000/graphql
Connected to MongoDB
```