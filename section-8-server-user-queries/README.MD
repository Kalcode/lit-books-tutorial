# Section 8 Server User Queries
<!-- TOC -->

- [Section 8 Server User Queries](#section-8-server-user-queries)
  - [Queries](#queries)
    - [Removing our example query](#removing-our-example-query)
  - [Type Definition](#type-definition)
  - [Resolver](#resolver)
    - [Users Resolver](#users-resolver)
    - [Hooking up the resolver](#hooking-up-the-resolver)
    - [Testing out the resolver](#testing-out-the-resolver)
    - [Error String cannot represent value](#error-string-cannot-represent-value)
    - [Re-run the query](#re-run-the-query)
  - [User query](#user-query)
    - [User Resolver](#user-resolver)
    - [Hooking the resolver up](#hooking-the-resolver-up)
    - [Testing out](#testing-out)
  - [Importance](#importance)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Queries

[In section 4](../section-4-server-basic-express-apollo-setup/README.MD) we setup a basic query called `sayHello` that returned `Hello World`. 

GraphQL we define a [schema in the typedefs](https://graphql.org/learn/schema/) and use [resolvers](https://graphql.org/learn/execution/#root-fields-resolvers) to create the function that runs when that endpoint is hit.

We will be creating two queries. `users` and `user`. `user` query will take an argument for id `user(id: String!)`.


### Removing our example query

Go ahead and delete the typeDef for `sayHello`

```graphql
export const typeDefs = gql`
  type Query {
  # sayHello: String # delete this line
  }

  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }
`;
```

and delete the resolver inside `resolvers.js`

```js
import { signup } from './mutations/signup';
import { login } from './mutations/login';

function sayHello() {   // delete this function
  return 'Hello World'; // delete this function
}                       // delete this function

export const resolvers = {
  Query: {
    sayHello, // delete this line
  },
  Mutation: {
    login,
    signup,
  },
}; 
```

## Type Definition

Before we create our resolvers we will want to define the type definition. 

Our `users` query will return a list of users. In GraphQL schema we will want to define a type for user.

In the file `typeDefs.js` we define a type called `User`

```graphql
type User {
  _id: String
  username: String
}
```

The user can currently have a id and a username. Those are the two fields we will add now. Later we will expand it to include other fields as well.

Under the type `Query` we add our `users` query and we tell it that it will return an array of `Users`.

```graphql
type Query {
  users: [User]
}
```

## Resolver

Now we need a resolver so when the query `users` is called the function is ran and retrieves a list of users. 

Just like we did with mutations lets create a folder called `queries` under the `graphql` folder.

This will help keep our query resolvers functions clean by having them in separate files. 

Create a file called `users.js` under the newly created folder.

`server/src/graphql/queries/users.js`

```js
export async function users(obj, args, context, info) {

}
```

[Resolver arguments from graphql.org](https://graphql.org/learn/execution/#root-fields-resolvers)
A resolver is given several parameters. In order is `obj`, `args`, `context` and `info`.

* `obj` The previous object, which for a field on the root Query type is often not used.
* `args` The arguments provided to the field in the GraphQL query.
* `context` A value which is provided to every resolver and holds important contextual information like the currently logged in user, or access to a database.
* `info` A value which holds field-specific information relevant to the current query as well as the schema details, also refer to type GraphQLResolveInfo for more details.

For this resolver we will not need any of the parameters. 

### Users Resolver

We need tp import our model and then use an async function to return the list of users.

We will use [`find` method on the mongoose model](https://mongoosejs.com/docs/api.html#model_Model.find) to return all rows of users. 

`server/src/graphql/queries/users.js`
```js
import { User } from '../../db/models/User';

export async function users() {
  return User.find();
}
```

### Hooking up the resolver

Inside `resolvers.js` we need to add our function.

```js
import { users } from './queries/users'; // import resolver

export const resolvers = {
  Query: {
    users // add here
  },
  Mutation: {
    login,
    signup,
  },
}; 
```

NOTE: We are calling the resolver `users` to match the typeDef `users`, the function itself can be named whatever.

example
```js
export const resolvers = {
  Query: {
    users: whateverFunctionName,
  },
}; 
```

But I find it easier to call the function the same name as the query and use the [Shorthand property names ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Property_definitions).

### Testing out the resolver

Now that we have the resolver imported to our resolver file we can call it in the playground. Navigate to http://localhost:4000/graphql`.

Run the following query:

```graphql
query {
  users {
    _id
    username
  }
}
```

If you don't see in results to the right it is because you haven't added a user most likely.

```graphql
mutation {
  signup(username: "Test", password: "Test")
}
```

Results should be similar in structure

```json
"data": {
  "users": [
    {
      "_id": null,
      "username": "test"
    },
    {
      "_id": null,
      "username": "Test"
    },
    {
      "_id": null,
      "username": "Test1"
    },
    {
      "_id": null,
      "username": "Test2"
    }
  ]
}
```

As well as `errors` at the end of the data/results.

### Error String cannot represent value

This error is because Mongo ID are a object itself and we want the id back as a string.

To fix this, we will convert the ID to a string when we retrieve it.

This will be added when the server first loads it files, inside our `server/src/index.js`


`server/src/index.js`
```js
import 'dotenv/config';
import express from 'express';
import jwt from 'express-jwt';
import Mongoose from 'mongoose'; // add this import

import { createApollo } from './graphql/createApollo';
import { connect } from './db/connect';

// Convert Mongo ObjectId to string
const { ObjectId } = Mongoose.Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};
```

There are multiple ways to solve this issue, one is inside the resolvers when you send back the model you can convert the id to a string there. 

The current approach we are taking will apply to anytime we grab the id, making it a more [DRY solution](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

### Re-run the query

Navigate to http://localhost:4000/graphql` and return the query

```graphql
query {
  users {
    _id
    username
  }
}
```

Now your results should show both the id and username

```json
{
  "_id": "5bf9f616ab7e022a54878402",
  "username": "test"
},
```

## User query

Now we want to create a user query that lets us query a specific user using their id.

Inside the file typeDefs add

`server/src/graphql/typeDefs`
```graphql
type Query {
  users: [User]
  user(_id: String!): User # Add here
}
```

We are making a query called `user` and we expect an argument of `_id`, to stay consistent with mongo naming of id, and the id is of a datatype `String`. The use of the exclamation point is to say that the argument is required and cannot be null.

### User Resolver

Create another file inside `queries` folder called `user.js`

`server/src/graphql/queries/user.js`
```js
import { User } from '../../db/models/User';

export async function user(obj, args) {
  return User.findById(args._id);
}
```

We import our User model again and we use an async function to return a promise. [The method `findById` for the model](https://mongoosejs.com/docs/api.html#model_Model.findById) will take the id we pass in and return the user with the id. 

We need to use the second parameter, `args`, we can recall earlier that:

* `args` The arguments provided to the field in the GraphQL query.

Which holds the arguments we pass into the query `user(_id: String!)`, so `args._id` will be the id we pass in to the query.

### Hooking the resolver up

Navigate to `resolvers.js` and add the new resolver

```js
import { user } from './queries/user'; // import

export const resolvers = {
  Query: {
    users,
    user, // add new resolver
  },
  Mutation: {
    login,
    signup,
  },
}; 
```

### Testing out

Navigate to `http://localhost:4000/graphql` and run the following query

```graphql
query {
  users {
    _id
    username
  }
}
```

On the right side a list of users should be under data and copy an `_id`.

then run another query using that id

```graphql
query {
  user(_id: "5bf9f616ab7e022a54878402") {
    username
  }
}
```

A user should be returned that was in the same list of `users` query.

## Importance

Its important to be able to fetch a list of users so we can let a logged in user navigate a list of users and click their name, when clicking their name we will use the id of the user clicked to retrieve more information about the user, in which case we want a query that ONLY gets that user.

## Next


## Committing to Git

```
git status
git add .
git commit -m "section 8 server user queries"
```