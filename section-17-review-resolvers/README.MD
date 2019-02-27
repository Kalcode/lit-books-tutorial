# Section 17 Review Resolvers

<!-- TOC -->

- [Section 17 Review Resolvers](#section-17-review-resolvers)
  - [Review](#review)
  - [Review Type Definition](#review-type-definition)
  - [Mutation Create Review](#mutation-create-review)
  - [Create Review Mutation](#create-review-mutation)
  - [Review Queries](#review-queries)
  - [Adding the resolvers](#adding-the-resolvers)
  - [Testing out the new resolver](#testing-out-the-new-resolver)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Review

Review is made up of:

* book
* description
* rating
* user

To create a review we need the user `_id` that made the review, a `description` or the review itself, the `book` `_id` and a rating.

## Review Type Definition

First we need to create a new graphql type for `Review`

`server/src/graphql/typeDefs`
```graphql
type Review {
  _id: String!
  book: Book!
  description: String!
  rating: Int!
  user: User!
}
```

## Mutation Create Review

Still editing our `typeDefs.js` we need to create a new mutation of the root resolver `Mutation`

`server/src/graphql/typeDefs`
```graphql
type Mutation {
  
  """
  Creates a new author is the current name isn't already in the database.
  """
  createAuthor(name: String!): Author

  createBook(
    author: String!,
    description: String!,
    published: String!,
    title: String!,
  ): Book

  createReview( # Add Here
    book: String!, # Add Here
    description: String!, # Add Here
    rating: Int!, # Add Here
  ): Review # Add Here

  signup(username: String!, password: String!): String
  
  login(username: String!, password: String!): String
}
```

To create a review the endpoint requires the book id, description and rating. We will be pulling the user id from the context.

## Create Review Mutation

Now we can create the resolver for the mutation. 

First we need to create the file under the folder `mutation` called `createReview.js`

We need to do several steps here to create a review. We can't create a review without associating a user to the review. This will be the first resolver we put in an authentication check. We want these checks on almost ALL of our mutations. We will eventually circle back around to implementing them across.

This will mean on playground to create a review you will need to use the access token we get from our mutation `login`.

Next we need to fetch the user from the database so we can add the newly created review to the user instance. 

Then we need to find the book the review is about.

We also want to make sure the user hasn't review this book before, so we will add a query and a check against that.

If any of these checks fail we throw a relevant error.

We will then create the review, await its return and then pass its id to both `User.reviews` and `Book.reviews` so when we want to find the associated reviews on `User` or `Book` we can.

At the end of the resolver we said in the `typeDef` that it returns a `Review`, that because we will return the review just created.

`server/src/graphql/mutations/createReview.js`
```js
import { AuthenticationError, ApolloError } from 'apollo-server-core';

import { Book } from '../../db/models/Book';
import { Review } from '../../db/models/Review';
import { User } from '../../db/models/User';

export async function createReview(obj, args, context) {
  const { book, description, rating } = args;

  const { user } = context;

  // Get user from context, this comes the access token we get when we use login mutation
  if (!user) {
    throw new AuthenticationError('Unauthorized or Invalid token');
  }
  
  // Find the user so we can get their model instance so we can associate the review
  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    throw new ApolloError('User not found');
  }

  // Find the book the review is about so we can associate the review with the book
  const foundBook = await Book.findById(book);

  if (!foundBook) {
    throw new ApolloError('Invalid Book Id');
  }

  // Check if the user has already reviewed the book
  // We do this by querying the user with the book id
  // if there is a match the user has review it before
  const alreadyReviewed = await Review.find({
    user: user._id,
    book: book,
  });

  if (alreadyReviewed) {
    throw new ApolloError('User has already reviewed this book');
  }

  const review = await Review.create({
    book,
    description,
    rating,
    user: user._id,
  });

  // Add review to book's reviews
  foundBook.reviews.push(review._id);
  await foundBook.save();

  // Add review to user's reviews
  foundUser.reviews.push(review._id);
  await foundUser.save();

  return review;
}
```

## Review Queries

We are going to create the queries for getting a review by its id and also the query to fetch all reviews.

In `typeDefs.js` lets add the two queries we need like we have done with `user`, `users`, `books`, `book`

`server/src/graphql/typeDefs.js`
```js
type Query {
    author(_id: String!): Author
    authors: [Author]
    
    book(_id: String!): Book
    books: [Book]
    
    review(_id: String!): Review
    reviews: [Review]
    
    user(_id: String!): User
    users: [User]
  }

```

In out `queries` folder lets create two files `review.js` and `reviews.js`

`server/src/graphql/queries/review.js`
```js
import { Review } from '../../db/models/Review';

export async function review(obj, args) {
  return Review.findById(args._id);
}

```

`server/src/graphql/queries/reviews.js`
```js
import { Review } from '../../db/models/Review';

export async function reviews() {
  return Review.find();
}
```

As before we use the model to find the record by ID and the `reviews` resolver we use the `find` method without any args to get all the records.

## Adding the resolvers

We need to hook it up to `resvolers.js`

`server/src/graphql/resolvers`
```js
// ... Other imports above
import { createReview } from './mutations/createReview'; // Add Import
import { review } from './queries/review'; // Add Import
import { reviews } from './queries/reviews'; // Add Import


export const resolvers = {
  Author,
  Book,
  Query: {
    author,
    authors,
    book,
    books,
    review,
    reviews,
    users,
    user
  },
  Mutation: {
    createAuthor,
    createBook,
    createReview, // Add our new mutation
    login,
    signup,
  },
}; 
```

## Testing out the new resolver

Navigate to the playground at `http://localhost:4000` and use the mutation to login with a user like below:

```graphql
mutation {
  login(username: "Test", password: "Test")
}
```

If you haven't created a user refer back to [section 7 server auth](../section-07-server-auth/README.MD)

You should receive a token like below

Token:
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzU1YzQzZjkyOTY0MDE5Y2NiZGExOTYiLCJ1c2VybmFtZSI6IlRlc3QiLCJpYXQiOjE1NTExMzg1NzUsImV4cCI6MTU1MTIyNDk3NX0.Yiiv9HYXFpwanZy1BwqX6afZ6pGbcAqtDEPDVHaI8CI`

Playground gives us a handy way to include header information.

On the bottom of the playground window is a tab called `HTTP HEADERS`, click that and you will enter a json with the following shape:

```json
{
  "Authorization": "Bearer {token}"
}
```

[This is a pretty standard way to pass a token info to a server using the headers.](https://tools.ietf.org/html/rfc6750#section-2.1). This is also how we will eventually be sending our token through from the front-end.

Insert the token that you got in place of `{token}`; Below is a picture and example, notice on the bottom the HTTP HEADERS section is expanded.

![Playground Token](images/playground_token.jpg?raw=true "Playground Token")

Example:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzU1YzQzZjkyOTY0MDE5Y2NiZGExOTYiLCJ1c2VybmFtZSI6IlRlc3QiLCJpYXQiOjE1NTExMzg1NzUsImV4cCI6MTU1MTIyNDk3NX0.Yiiv9HYXFpwanZy1BwqX6afZ6pGbcAqtDEPDVHaI8CI"
}
```

Now we can create a review with our new token. This token does expire after a day, if that happens just re-login.

Make sure you query for a books `_id` to use in the mutation like below:

```graphql
mutation {
  createReview(
    book: "5c634b6e28e11d316014d9a3",
    description: "This book was good, its kinda nice top sit by a fire and watch it burn",
 		rating: 1
  ) {
    description
    rating
    user {
      _id
      username
    }
  }
}
```

Now I suggest running it again so you can check that it won't let you add another review of the same book for the same user.

Lets query reviews now

```graphql
query {
  reviews {
    _id
    description
    rating
  }
}

```

Grab an `_id` from your `reviews` query and lets run the `review` query.

```graphql
query {
  review(_id: "5c747f1de03ed115f84f40c3") {
    _id
    description
    rating
  }
}

```

## Next

Now we will create the review object-maps..

## Committing to Git

```
git status
git add .
git commit -m "section 17 review resolvers"
```