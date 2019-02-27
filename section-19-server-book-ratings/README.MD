# Section 18 Review Resolvers

<!-- TOC -->

- [Section 18 Review Resolvers](#section-18-review-resolvers)
  - [Review Object Mapping](#review-object-mapping)
  - [Review Resolver](#review-resolver)
  - [Resolver.js hooking it up](#resolverjs-hooking-it-up)
  - [Adding reviews to User](#adding-reviews-to-user)
    - [Updating type](#updating-type)
    - [Creating User Object Map](#creating-user-object-map)
    - [Adding User to resolvers](#adding-user-to-resolvers)
  - [Updating the Book resolver](#updating-the-book-resolver)
    - [Updating the type](#updating-the-type)
    - [Updating book resolver](#updating-book-resolver)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Review Object Mapping

In this section we will be object-mapping `Review` which has association with both a `User` who submitted the review and the book the review is about.

## Review Resolver

In the folder `object-maps` lets create the file `Review.ts`

Review resolvers need to return the book it is associated with and the user, below we right two functions that take the id from the parent  object, `obj`, and finds it in the database by id.

`server/src/graphql/object-maps/Review.js`
```js
import { Book } from '../../db/models/Book';
import { User } from '../../db/models/User';

export const Review = {
  book: async function(obj) {
    return Book.findById(obj.book);
  },
  user: async function(obj) {
    return User.findById(obj.user);
  }
};
```

## Resolver.js hooking it up

Now we need to add the `Review` resolvers to `resolver.js`

```js
// ... imports
import { Review } from './object-maps/Review'; // add this line


export const resolvers = {
  Author,
  Book,
  Review, // Add Review here
  Query: {
    // ... queries
  },
  Mutation: {
    // ... mutations
  },
}; 
```

## Adding reviews to User

We need to update the `type` for the `User` and the resolver for `User` to have reviews return from user.

### Updating type

In the `typeDef.js` file lets add the reviews field

`server/src/graphql/typeDefs.js`
```graphql
type User {
  _id: String
  username: String
  reviews: [Review]  # Add new field
}
```

### Creating User Object Map

Since we don't have a User object-map yet lets create the file under the folder `object-maps`

Create the file `User.js`

We will leverage the populate function again to grab the ids in reviews and populate the reviews of the `User` with the instance that match the ids. [For reference to the `populate` function, check out the mongoose docs.](https://mongoosejs.com/docs/populate.html)

`server/src/graphql/object-maps/User.js`
```js
import { User as UserModel } from '../../db/models/User'

export const User = {
  reviews: async (obj) => {
    await UserModel.populate(obj, 'reviews');

    return obj.reviews;
  }
}
```

### Adding User to resolvers

We once again need to add the new object-map, `User`, to`resolver.js`

```js
// ... imports
import { User } from './object-maps/User'; // add this line


export const resolvers = {
  Author,
  Book,
  Review,
  User, // Add Review here
  Query: {
    // ... queries
  },
  Mutation: {
    // ... mutations
  },
}; 
```

## Updating the Book resolver

Books also return their reviews, we will need to update the typeDef and also the object-map

### Updating the type

Update the type by adding 

`server/src/graphql/typeDefs.js`
```graphql
type Book {
  _id: String!
  author: Author!
  description: String!
  published: String!
  reviews: [Review] # Add new field
  title: String!
}
```

### Updating book resolver

The Book resolver will return reviews using the `populate` method. This method is good to populate any model when passed an instance of it with the requested associated field. We could for example use it to populate author instead of using the `obj.author`

example:
```js
author: async function(obj) {
  // return Author.findById(obj.author);
  await BookModel.populate(obj, 'author')

  return obj.author
}
```

We will leave finding an author by using `findById` but we will use `populate` to grab the reviews.

`server/src/graphql/object-maps/Book`
```js
import { Author } from '../../db/models/Author';
import { Book as BookModel } from '../../db/models/Book';
import { Types } from 'mongoose';

export const Book = {
  author: async function(obj) {
    return Author.findById(obj.author);
  },
  reviews: async function(obj) {
    await BookModel.populate(obj, 'reviews');

    return obj.reviews;
  },
};
```

## Next

Next section we will be creating an aggregate of data from the reviews of a book to return an average rating of all the ratings of reviews.

## Committing to Git

```
git status
git add .
git commit -m "section 18 review object-maps"
```