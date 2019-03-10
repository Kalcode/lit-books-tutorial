# Section 19 Server Resolver Guard

<!-- TOC -->

- [Section 19 Server Resolver Guard](#section-19-server-resolver-guard)
  - [Guard Resolver](#guard-resolver)
  - [Resolver Guard Function](#resolver-guard-function)
  - [Using the guard](#using-the-guard)
  - [Refactor createReview](#refactor-createreview)
  - [Testing](#testing)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Guard Resolver

None of our mutations should be accessible without a token. We will be using the same logic we did to protect the `createReview` resolver. Since we will be using it several places we will be creating a helper function for it called `authGuard`

## Resolver Guard Function

Create a folder under `src` called `helpers`. Then create a new file called `authGuard.js`

`server/src/helpers/authGuard.js`
```js
import { AuthenticationError } from 'apollo-server-express';

export function authGuard(next) {
  return function(root, args, context, info) {
    if (!context.user) {
      throw new AuthenticationError('Unauthorized Access');
    }

    return next(root, args, context, info);
  };
}
```

The above function will take in a resolver and return a function. The function job is to check the `context` object for the user context. We set up the context in [section 16.1](../section-16.1-server-auth-context-user/README.MD). `jwt-express` package is responsible for checking our token validity and setting the `req.user`, if the object is `null` or `undefined` then the user isn't signed in. 

That is where we can safety check if they are a valid user at all. 

To Recap the function takes a function, the resolver, and returns a function `return function(root, args, context, info)` and checks the `context.user` to see if there is a object there. If not, throw an error. Then calls the function it received, the resolver and passes the arguments forward to the resolver, ` return next(root, args, context, info);`.

## Using the guard

In your `resolver.js` file import the `authGuard` function and lets use it in our mutations below.

`server/src/graphql/resolvers.js`
```js
import { authGuard } from '../helpers/authGuard'; // new import

// ... rest of the resolvers above
  Mutation: {
    createAuthor: authGuard(createAuthor), // Add authGuard here
    createBook: authGuard(createBook), // Add authGuard here
    createReview: authGuard(createReview), // Add authGuard here
    login,
    signup,
  },
}; 
```

## Refactor createReview

In the file `createReview` we are checking the context and throwing a `AuthenticationError`, we no longer need to do that since we have the authGuard doing that job for us.

Remove the following lines

`server/src/graphql/mutations/createReview.js`
```js
if (!user) {
  throw new AuthenticationError('Unauthorized or Invalid token');
}
```

We still need the `user` object from context to add their `_id` to the book. But we don't need to double check if they are authorized.

## Testing

Navigate to the `playground` at `http://localhost:4000/graphql` and get rid of the `http headers` and try to create a book or author.

## Next

Next we will start setting up the client using [create react app](https://facebook.github.io/create-react-app/). 

## Committing to Git

```
git status
git add .
git commit -m "section 20 server resolver guard"
```