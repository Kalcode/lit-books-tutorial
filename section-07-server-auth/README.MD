# Section 7 Server Auth
<!-- TOC -->

- [Section 7 Server Auth](#section-07-server-auth)
  - [Auth - Authentication and Authorization](#auth---authentication-and-authorization)
  - [Packages](#packages)
  - [Installing packages](#installing-packages)
  - [Query vs Mutation](#query-vs-mutation)
  - [Signup query](#signup-query)
    - [Typedef](#typedef)
    - [Resolvers](#resolvers)
    - [Testing the mutations out](#testing-the-mutations-out)
  - [Signing up](#signing-up)
    - [the resolver](#the-resolver)
    - [Finding an existing user](#finding-an-existing-user)
    - [Creating the user](#creating-the-user)
      - [Salting/Hashing](#saltinghashing)
      - [Creating the user](#creating-the-user-1)
      - [Generating a token](#generating-a-token)
        - [Env](#env)
    - [Testing the code out](#testing-the-code-out)
    - [Inspecting Tokens](#inspecting-tokens)
  - [Logging in](#logging-in)
    - [Query the user in the resolver](#query-the-user-in-the-resolver)
    - [Comparing password](#comparing-password)
    - [JSON Token](#json-token)
    - [Login Resolver](#login-resolver)
    - [Testing out logging in](#testing-out-logging-in)
  - [Middleware Auth](#middleware-auth)
    - [Context](#context)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Auth - Authentication and Authorization

We will authenticate the user during their login process by comparing the password in the database with the supplied password. Passwords will be hashed and salted.

Then we will use JWT Tokens for Authorization of resources.

To start creating users and using queries/mutation to login and sign-up we need to setup auth. Authorization will be done with the JWT. To do this we must store the user password and verify it in the database when passed later. We don't want to store plain text passwords and we want to rely on modern methods, which is hashing and salting the password before it gets stored in the database.

Once we store their password, when it is sent and verified we will compare it against the stored hashed password. If it is a match we will sign a token with an expiration and hand it back to the user. This token is a key for the user to request resources from the server.

## Packages

`bcrypt`: (https://github.com/kelektiv/node.bcrypt.js)[https://github.com/kelektiv/node.bcrypt.js]
`express-jwt`: (https://github.com/auth0/express-jwt)[https://github.com/auth0/express-jwt]
`jsonwebtoken`: (https://github.com/auth0/node-jsonwebtoken)[https://github.com/auth0/node-jsonwebtoken]

`bcrypt` is responsible for salting and hashing the passwords when storing and comparing.
`express-jwt` is a middleware that validates the token and hands the info to context for our server. 
`jsonwebtoken` is responsible for generating signed tokens.

## Installing packages

in the terminal type the following:

`npm install bcrypt express-jwt jsonwebtoken`

## Query vs Mutation

We will use both logging in and signing up as a `mutation`. Arguably login resolver should be a query but for many practical reason we will be using a `mutation` for this.

This most straight-forward reason is query component in `react-apollo` typically auto fire. Where mutation require a call to a function, more closer to a user clicking `login`.

In general the rule though is query is for resolvers with no side-effects, like mutating data, and mutating is for side-effecs.

## Signup query

Inside the `graphql` folder on the server, create a new folder called mutations and a new file called `signup.js`.

Inside the file `signup.js` add the following for now:

`server/src/graphql/mutations/signup.js`
```js
export function signup() {
  return 'Signing up';
}
```

Add another file inside `mutations` called `login.js`. Add the following code:

`server/src/graphql/mutations/login.js`
```js
export function login() {
  return 'Logging in';
}
```

### Typedef

We need to update the `typeDefs.js` file and `resolvers.js` file.

`server/src/graphql/typeDefs.js`
```js
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    sayHello: String
  }

  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }
`;
```

Where we added a new type called `Mutation`, inside the type we have defined how our resolvers `signup` and `login` can be called. They both require a username and password to be passed in.

### Resolvers

`server/src/graphql/resolvers.js`
```js
import { signup } from './mutations/signup';
import { login } from './mutations/login';

function sayHello() {
  return 'Hello World';
}

export const resolvers = {
  Query: {
    sayHello,
  },
  Mutation: {
    login,
    signup,
  },
}; 
```

Here we tell the server where to find our resolvers. In the object `resolvers` we have a new key called `Mutation` that mirrors our type definitions.

These are the functions we created earlier that are being imported.

### Testing the mutations out

Go ahead and start the server with `npm run dev`. Navigate to the playground for example `http://localhost:4000/graphql`

Make a new mutation by placing this inside the playhground

```graphql
mutation {
  signup(username: "Test", password: "Test")
}
```

Our return type is a `String` so we don't need to request and fields. Run the mutation and you should see:

```json
{
  "data": {
    "signup": "Signing up"
  }
}
```

## Signing up

We will need to take the username and password, see if the user exists in the database first, if not we will create a user with the supplied username and, salt and hash their password.

Inside the `signup.js` file

### the resolver

[The resolver gets passed four arguments, `obj, args, context, info`.](https://www.apollographql.com/docs/graphql-tools/resolvers.html)


We will only be using `args` for this resolver, so edit the resolver to pass in the first two arguments:

`server/src/graphql/mutations/signup.js`
```js
export function signup(obj, args) {
  return 'Signing up';
}
```

The args parameter will have the arguments passed into the resolver that we defined earlier, the `username` and `password`:

`signup(username: String!, password: String!)`

So the shape of `args` will look like this:

```js
{
  username: "Test",
  password: "Test",
}
```

So we will need to grab those variables:

```js
export function signup(obj, args) {
  const { username, password } = args;

  return 'Signing up';
}
```

### Finding an existing user

We need to import out User model and query the database for a user with the same username.

We are going to import `User` from `import { User } from '../../db/models/User';` 

[We will be using promises in the resolver and will be using `async` to resolve those promises.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function0)

The function needs to change to:

```js
// note the `async`
export async function signup(obj, args) {
```

Mongoose has a method on a model called `findOne`, this will look for one record that matches our query. 

```js
 const user = await User.findOne({ username });
 ```

 If there is a user we will want to throw an error for our client.

 ```js
 if (user) {
    throw ApolloError('Username invalid or already taken.');
  }
```

Import AuthenticationError from `import { AuthenticationError } from 'apollo-server-core';`

So far:

`server/src/graphql/mutations/signup.js`
```js
import { ApolloError } from 'apollo-server-core';

import { User } from '../../db/models/User';

export async function signup(obj, args) {
  const { username, password } = args;
 
  const user = await User.findOne({ username });

  if (user) {
    throw new AuthenticationError('Username invalid or already taken.');
  }

  return 'Signing up';
}
```

### Creating the user

We need to take the password salt/hash it and then create a new record with the hashedPassword and Username.

#### Salting/Hashing

import bcrypt and create a new variable called `hashedPassword`

```js
 const hashedPassword = await bcrypt.hash(password, 10);
```

This will take the password and salt/hash it with ten rounds. The default value. [For suggested number of rounds on a hash requires more research and is generally specific to your application.](https://security.stackexchange.com/questions/17207/recommended-of-rounds-for-bcrypt).

#### Creating the user

Now we can create the user. [We will call the `create` method on the User model](https://mongoosejs.com/docs/models.html#constructing-documents)

```js
const newUser = await User.create({
  username,
  password: hashedPassword,
});
```

this will create a record with the supplied username and hashedPassword, and will return the newly created user that has its `_id` generated.

#### Generating a token

Now that the user has signup we should send a token back so they can immediately login.

Generating a token is easy, we will sign the token with a secret key that we store in our `env` and we will add a 1 day expiration to it and also put the username and their id in the payload so we can identify them when their request come in.

```js
return jsonwebtoken.sign(
  {
    _id: newUser._id,
    username: newUser.username,
  },
  process.env.JSON_WEB_TOKEN_SECRET,
  { expiresIn: '1d' },
);
```

##### Env

Inside our `.env` add the following variable:

```env
JSON_WEB_TOKEN_SECRET=SOME_SECRET
```

`SOME_SECRET` can be anything and is secret to the server using it. It what is use to get a Token signed and verified. 

It can be something like `lINGgf1i2XcKOwgdZ6JZ` or `ThisIsASecretForMyTokens` as long as its unique and secret.

### Testing the code out

So far this is the new resolver:
`server/src/graphql/mutations/signup`
```js
import { AuthenticationError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { User } from '../../db/models/User';

export async function signup(obj, args) {
  const { username, password } = args;
 
  const user = await User.findOne({ username });

  if (user) {
    throw new AuthenticationError('Username invalid or already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword,
  });

  return jsonwebtoken.sign(
    {
      _id: newUser._id,
      username: newUser.username,
    },
    process.env.JSON_WEB_TOKEN_SECRET,
    { expiresIn: '1d' },
  );
}
```

Make sure the server is running, if not use `npm run dev`, navigate to the playground again and run the following mutation:

```graphql
mutation {
  signup(username: "Test", password: "Test")
}
```

The first time you run it should return a token. Like the following:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzU1YzZjNmYzODJkZDM3YzA0NzAzMGYiLCJ1c2VybmFtZSI6IlRlc3QxIiwiaWF0IjoxNTQ5MTI1MzE4LCJleHAiOjE1NDkyMTE3MTh9.4eweGOOxWJqawF-7yepN2wUbNbW-z9BuismIBXJF_qM
```

Run it again and a error should return:

```json
"message": "Username invalid or already taken",
```

If you are seeing these results so far you have been successful in creating a user with a hashed password and a json web token.

### Inspecting Tokens

You can inspect token using [https://jwt.io/](https://jwt.io/), simply paste the token in to see its payload.

In my example I get the following:

```js
{
  "_id": "5c55c6c6f382dd37c047030f",
  "username": "Test1",
  "iat": 1549125318,
  "exp": 1549211718
}
```

Payloads in tokens are not secret as you can see. Do not store SENSTIVE information here. The token when sent to the server also has a string that can be checked if it was actually generated by the server. It checks for the signature that can't be faked and if the token doesn't match that signature it gets rejected.

## Logging in

Logging in is very similar, we will query for the user, if the user exits we will hash the password they sent and compare it to the hashed password in the database. If they match the user has access to that account and we should create a new token, sign it and send it back. If the user doesn't exist or password is wrong we will send a `AuthenticationError`

### Query the user in the resolver

Inside `login.js`  we will need the same imports

```js
import { AuthenticationError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { User } from '../../db/models/User';
```

and turn the function into an `async` function AND add the first two parameters `obj, args`.

```js
export async function login(obj, args) {
```

Now we need to query for the user:

```js
const { username, password } = args;
 
const user = await User.findOne({ username });
```

So far the code should be very similar.

Difference here is we want to make sure a user actually exists.

```js
if (!user) {
  throw new AuthenticationError('Invalid Username or Password');
}
```

### Comparing password

Now that we know the user is valid, we need to see if they have access by comparing passwords.

```js
const valid = await bcrypt.compare(password, user.password);
```

We compare the password that came in to the password in the database, we let bcrypt handle salting and hashing the incoming password to check the match.

we throw the same error if invalid

```js
 if (!valid) {
  throw new AuthenticationError('Username invalid or already taken');
}
```

### JSON Token

If we have gotten this far without an error thrown they are a valid user and we issue them a token

```js
return jsonwebtoken.sign(
  { 
    _id: user._id,
    username: user.username,
  },
  process.env.JSON_WEB_TOKEN_SECRET,
  { expiresIn: '1d' },
);
```

### Login Resolver

The login in resolver so far

`server/src/graphql/mutations/login`
```js
import { AuthenticationError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { User } from '../../db/models/User';

export async function login(obj, args) {
  const { username, password } = args;
 
  const user = await User.findOne({ username });

  if (!user) {
    throw new AuthenticationError('Invalid Username or Password');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new AuthenticationError('Invalid Username or Password');
  }

  return jsonwebtoken.sign(
    { 
      _id: user._id,
      username: user.username,
    },
    process.env.JSON_WEB_TOKEN_SECRET,
    { expiresIn: '1d' },
  );
}
```

### Testing out logging in

Navigate to the playground `http://locahost:4000/graphql` and run the following mutation

```grahpql
mutation {
  login(username: "Test", password: "Test")
}
```

You should get a token returned, and then try it out with an invalid password, you should get the `Invalid Username or Password` error.


## Middleware Auth

Now we will connect the `jwt-express` package to validate our tokens when they come in.

Inside your server `index.js` file add this after the express server creation

```js
async function start() {
  const app = express();

  const authMiddleware = jwt({
    secret: process.env.JSON_WEB_TOKEN_SECRET,
    credentialsRequired: false,
  }); // Add here

  app.use(authMiddleware); // Add here
```

at the top of the file import package `import jwt from 'express-jwt';`

`server/src/index`
```js
import 'dotenv/config';
import express from 'express';
import jwt from 'express-jwt';

import { createApollo } from './graphql/createApollo';
import { connect } from './db/connect';

async function start() {
  const app = express();

  const authMiddleware = jwt({
    secret: process.env.JSON_WEB_TOKEN_SECRET,
    credentialsRequired: false,
  });

  app.use(authMiddleware);

  await connect();

  const graphqlServer = createApollo(app);

  app.get('/', (req, res) => {
    return res.send('Root Route');
  });

  const { PORT } = process.env; 

  app.listen({ port }, () => {
    console.log(`GraphQL Server ready at http://localhost:${port}${graphqlServer.graphqlPath}`);
  });
}

start();
```

### Context

This adds `user` to the `request` object in every express request. `request.user` for example. If the token is valid, signed correctly then it will get its payload attached to that user context. We will later wire that up to apollo so that every resolver has access to the user context.

## Next

Now that we can create users we will want to be able to get a list of users.

We will add a resolver and query that will fetch the current list of users. This is an important resolver in our application as being able to retrieve a list of users is useful for both an admin user and a regular user to explore other users and their reviews.

*Note: We will be needing an admin user, but neither our schema or our database model accounts for this, as we continue in the app think about a way you may identify a user as an admin.*

## Committing to Git

```
git status
git add .
git commit -m "section 7 server auth"
```