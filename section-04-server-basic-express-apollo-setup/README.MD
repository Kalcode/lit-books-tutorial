# Section 4 Server Basic Express/Apollo Setup

<!-- TOC -->

- [Section 4 Server Basic Express/Apollo Setup](#section-4-server-basic-expressapollo-setup)
  - [Installing NPM Packages](#installing-npm-packages)
  - [Express Server](#express-server)
    - [Testing out the express server](#testing-out-the-express-server)
  - [GraphQL](#graphql)
    - [Creating `graphql` folder](#creating-graphql-folder)
    - [Creating your first type definition](#creating-your-first-type-definition)
    - [Creating your `sayHello` resolver](#creating-your-sayhello-resolver)
    - [Adding to the index](#adding-to-the-index)
    - [Creating the graphql server](#creating-the-graphql-server)
  - [Testing out](#testing-out)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Installing NPM Packages

First we need to add and install the packages we will be using to set-up the server.

run the following in your terminal in the `server` folder:

```sh
npm install apollo-server-express express graphql 
```

`apollo-server-express` and `graphql` is for the graphql part of the server. You can find more about Apollo and [setting up a server here.](https://www.apollographql.com/docs/apollo-server/essentials/server.html)

`express` is for our express server. [See here](https://expressjs.com/en/starter/hello-world.html) for more information about setting up express.

## Express Server

Setting up express is pretty straight forward here. In your `src/index.js` add the following.

```javascript
import express from 'express'; 
const app = express();

app.get('/', (req, res) => {
  return res.send('Root Route');
});

const port = 4000;

app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}`);
});
```

This setup a standard express server. Below [imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) `express` and below that line `const app = express()` [creates the instance of our express server](https://expressjs.com/en/4x/api.html#express).

```js
import express from 'express'; 
const app = express();
```

This sets a route for `/`, so when you visit the app at `localhost:4000/` it will use the function as a ['route' for express](https://expressjs.com/en/4x/api.html#app.get.method) to determine what to return when the path is hit by the client.

```
app.get('/', (req, res) => {
  return res.send('Root Route');
});
```

Now we save a variable called port with `4000` and then pass that to a method called [listen in express](https://expressjs.com/en/4x/api.html#app.listen). Listen takes a object that represents options, one of them being `port` and a callback which we use to `console.log` a message that the server is ready.

```js
const port = 4000;

app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}`);
```

### Testing out the express server

Run the development server inside the `server` folder by typing `npm run dev`, and open your browser to [http://localhost:4000](http://localhost:4000)

On the screen you should see:

```
Root Route
```

This means the express server is properly set-up. Moving onto the graphQL portion.

## GraphQL

Before we can setup the server with graphql we need to setup a folder with some files.

### Creating `graphql` folder

Create a folder under `server/src` called `graphql`, with a file called `index.js`. So we should have `server/src/graphql/index.js`.


### Creating your first type definition

Create a file in the `graphql` folder called `typeDefs.js`. 

File Created: `server/src/graphql/typeDefs.js`

Inside the file we need to define a [Query](https://graphql.org/learn/schema/#the-query-and-mutation-types).

In the `typeDefs.js` file 

```js
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    # we need a starting query here
  }
`;
```

`gql` is from [`graphql-tag` package](https://github.com/apollographql/graphql-tag). It used to take the string 

```js
`
  type Query {
    # we need a starting query here
  }
`
```

and turn it into a schema that graphQL understands. It uses string [tagged templates literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). Which is similar to calling `gql('some string');`

Now we need to add a query to the type, we will replace `# we need a starting query here` with below:

```js
export const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;
```

This is saying we have a query called `sayHello` and it returns a type `String`.

### Creating your `sayHello` resolver

Create a file in the `graphql` folder called `resolvers.js`. 

File Created: `server/src/graphql/resolvers.js`

We need to create a resolver, which is a function, we will name it the same as the query, `sayHello`.

The function simply returns a `string` of `'Hello World'`. A `String` type for the graphql schema expects a `string` to be returned.

```js
function sayHello() {
  return 'Hello World';
}
```

Below the function add this to the end of the `resolvers.js` file:

```js
export const resolvers = {
  Query: {
    sayHello,
  }
}; 
```

This creates a variable called `resolvers` that holds an [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) `{}`. The Object has a property called `Query` which represents the schema we defined earlier in the `typeDefs.js`. When the call to `sayHello` is made the graphql server sees the call is a Query type and looks for that resolver `sayHello` inside the `Query` property of `resolvers`.

So we put another property inside the object `Query` called `sayHello` and using [shorthand property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015);

The above is the same as:

```js
Query: {
    sayHello: sayHello,
  }
```

Since the function and property are the same name, we can collapse it to

```js
Query: {
    sayHello,
}
```

Its good practice to call the function used for the resolver the same name as the resolver in the Query. 

### Adding to the index

In the file we created earlier, `index.js` inside `src/graphql` we will add

```js
export { resolvers } from './resolvers';
export { typeDefs } from './typeDefs';
```

This is to help organize our files when importing them into other files. We are simply importing our exports immediately [exporting](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#Syntax) them. 

Now they will be available from importing the folder `graphql` instead of importing `graphq/resolvers`. We will see how we use it below.

### Creating the graphql server

Lets import `ApolloServer` and import our `typeDefs` and `resolvers`. 

Below is the code to import them. Make sure all imports are before anything else.

```js
import { ApolloServer } from 'apollo-server-express'; 
import express from 'express';

import { typeDefs, resolvers } from './graphql';

// other code here
```

As you can see, we imported `./graphql` and we can specify we want the `typeDefs` and `resolvers`. That's because by default it will look for `index.js` inside the folder when just importing folder itself. Our `index.js` is also exporting `typeDefs` and `resolvers`.

Below is the rest of the code for creating the server. `ApolloServer` is a class that takes an options for its first argument. The two properties we define in the options is `typeDefs` and `resolvers`

```js
const app = express();

app.get('/', (req, res) => {
  return res.send('Root Route'); 
});

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

graphqlServer.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () => {
  console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
});
```

So we remember earlier that those were shorthands for:

```js
const graphqlServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
```

This line `graphqlServer.applyMiddleware({ app });` attaches the newly created graphqlServer to our express `app`.

We change our console.log to ``console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);`` using the new class instance `graphqlServer` that has a property `graphqlPath` representing the url to connect to our `graphql` server.

Final file should look like:

```js
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { typeDefs, resolvers } from './graphql';

const app = express();

app.get('/', (req, res) => {
  return res.send('Root Route');
});

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

graphqlServer.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () => {
  console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
});
```

There are comments in the [file linked here](server/src/index.js)


## Testing out

Run the server using `npm run dev` at the `server` folder.

```
npm run dev
```

with an output like

```
[nodemon] starting `babel-node src`
GraphQL Server ready at http://localhost:4000/graphql
```

Open your browser to [http://localhost:4000/graphql](http://localhost:4000/graphql)

In the left pane write:

```GraphQL
{
  sayHello
}
```

Then click the play button in the middle and the right pane should output:

```json
{
  "data": {
    "sayHello": "Hello World"
  }
}
```

Congratulation, we have our express and graphql server working.

## Committing to Git

```
git status
git add .
git commit -m "section 4 server basics
```