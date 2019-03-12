# Section 19 Server Current User

<!-- TOC -->

- [Section 19 Server Current User](#section-19-server-current-user)
  - [Current User](#current-user)
    - [New token request](#new-token-request)
  - [New Type](#new-type)
  - [Adding the Query](#adding-the-query)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Current User

We will create a query that returns current user associated with the sent token. We can also allow them to request a new token too. 

### New token request

The purpose of this query serves two purpose. When the application refreshed via a user, or when they come back and visit the application and we have their token stored and still not expired we want the user automatically login. We could accomplish this two ways, we can decode the token and get the username or we can request the info from the server. If the server returns a user that means the token is valid and the user is "signed-in". 

But if the token is almost expired, the application will have to request the user to log in again. We can minimize this in a couple ways. 

The way we will approach it here is have an option be passed to the currentUser query that request a new token to be sent. If the token is valid, a new token is generated and sent, effectively resetting the expired time. In other words, as long as the current token is valid, we can issue a new short term token. Once it expires the user will have to sign in again.

## New Type

We will create a new type as a when a new token is requested we will send back a field called `token`. The new type will be `CurrentUser`. The structure will the following fields:

```js
{
  _id: 'ac23sacas2123'
  username: 'Test',
  token: 'eyasidajaskdasjjsdgh023945hr8234rfh9ihcv0823hf9823h9cf823hf9032',
}
```

Navigate to our `typeDefs.js` file and add the following type:

`server/src/graphql/typeDefs.js`
```graphql
type CurrentUser {
  _id: String
  username: String
  token: String
}
```

## Adding the Query

In the same `typeDefs` file lets add our new query.

`server/src/graphql/typeDefs.js`
```graphql
type Query {
  author(_id: String!): Author
  authors: [Author]
  
  book(_id: String!): Book
  books: [Book]

  currentUser(newToken: Boolean): CurrentUser
  
  review(_id: String!): Review
  reviews: [Review]
  
  user(_id: String!): User
  users: [User]
}
```

## Next

Next we will start setting up the client using [create react app](https://facebook.github.io/create-react-app/). 

## Committing to Git

```
git status
git add .
git commit -m "section 21 server current user"
```