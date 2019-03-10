# Section 16.1 Server Auth Context

<!-- TOC -->

- [Section 16.1 Server Auth Context](#section-161-server-auth-context)
  - [Server Context](#server-context)
  - [Apollo Context](#apollo-context)
  - [Creating the function](#creating-the-function)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Server Context

When our server authenticates a JWT token it will take that payload and add it to the request using the library `jwt-express` we added early on. Currently we don't do anything with this user object. We will be using it to get the current user and their id.

## Apollo Context

[Apollo server has a context function](https://www.apollographql.com/docs/apollo-server/api/apollo-server.html#constructor-options-lt-ApolloServer-gt) that we can use to take the server's request object and assign it to the graphql context.

[Express/Node.js has a request](https://expressjs.com/en/api.html#req) that comes in with each request made. That object holds information about the request itself. `jwt-express` will check if a payload is valid from a token and attach it to the `request` object as `user`. We want that `user` object inside our `graphql` so we can check the user info.

Apollo server lets you grab the `request` object and return a context object.

```js
context: ({ req }) => {
  return {
    user: req.user
  };
},
```

In the above example, we are given the `req`, request object, from express. We then return an object that has a property called `user` that was assigned `req.user`, the user object given to us from `jwt-express` that potentially contains our user information.

## Creating the function

Navigate to your `createApollo` server and lets add the context code

`server/src/graphql/createApollo.js`
```js
export function createApollo(app) {
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async function({ req }) { // Ad this function

      return {
        user: req.user,
      };
    },
  });
  
  graphqlServer.applyMiddleware({ app }); 

  return graphqlServer;
}
```

Similar to the example code, we are taking that user object and assigning it to the context object.

## Next

Now we will create the review resolvers.

## Committing to Git

```
git status
git add .
git commit -m "section 16.1 server auth context user"
```