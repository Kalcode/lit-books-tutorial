# Section 14 Server Book Resolvers
<!-- TOC -->

- [Section 14 Server Book Resolvers](#section-14-server-book-resolvers)
  - [Book Resolvers](#book-resolvers)
  - [Book Type definitions](#book-type-definitions)
  - [Resolvers](#resolvers)
  - [Book queries](#book-queries)
  - [Hooking up the resolvers](#hooking-up-the-resolvers)
  - [Testing](#testing)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Book Resolvers

Creating a book will require an author id. Now that we have author working we can create our book queries and mutations.

## Book Type definitions 

We will need a new type, two new queries and a mutation.

`typeDefs.js`
```graphql
type Book {
  _id: String!
  author: String!
  description: String!
  published: String!
  title: String!
}
```

Published field will be a string for year published.

Mutation and query we need to add

```graphql
type Query {
  author(_id: String!): Author
  authors: [Author]
  book(_id: String!): Book # Add booksquery
  books: [Book] # Add books query
  user(_id: String!): User
  users: [User]
}

type Mutation {
  createAuthor(name: String!): Author
  createBook(
    author: String!,
    description: String!,
    published: String!,
    title: String!,
  ): Book # add createBook mutation
  signup(username: String!, password: String!): String
  login(username: String!, password: String!): String
  }
```

Add `book` and `books` to the `Query` type and `createBook` to mutation.

## Resolvers

Under the `mutations` folder create a new file called `createBook.js`

Our resolver takes 4 arguments:

* author
* description
* published
* title

`server/src/graphql/mutations/createBook`
```js
import { ApolloError } from 'apollo-server-core';

import { Book } from '../../db/models/Book';
import { Author } from '../../db/models/Author';

export async function createBook(obj, args) {
  const { author, description, published, title } = args;
   
  const validAuthor = await Author.findById(author);

  if (!validAuthor) {
    throw new ApolloError('Invalid Author _id');
  }

  const bookExist = await Book.findOne({
    title: new RegExp(`^${title.trim()}$`, 'i'),
  });

  if (bookExist) {
    throw new ApolloError('Book title already exists.');
  }

  const book = await Book.create({
    author,
    description,
    published,
    title: title.trim(),
  });

  // Adding the book to the authors book list
  validAuthor.books.push(book._id);
  await validAuthor.save();

  return book;
}
```

Here we `const { author, description, published, title } = args;` we deconstruct the object args to get all the arguments from args.

We need to make sure the `_id` of the author that is passed in is valid, so we find an author and see if they exist. If not we need to throw an error, then we check if the book has already been added with the same title, same thing we throw an error if it has. Finally we create the book if no errors happen at this point.

After we create the book we want to save that book on the author too. That way the author also has its relationship with the book. 

```js
validAuthor.books.push(book._id);
await validAuthor.save();
```

here we take the author we pulled from above and push the new id on the books array on the model instance, we then use `save` method to save the data to the database.

## Book queries

Now we need to create two files `book.js` and `books.js`

At this point I strongly encourage you to create the two resolvers for these queries and hook up the mutation and queries resolver to the `resolver.js` yourself and come back to the tutorial if you get stuck.

`book.js`
```js
import { Book } from '../../db/models/Book';

export async function book(obj, args) {
  return Book.findById(args._id);
}
```

`books.js`
```js
import { Book } from '../../db/models/Book';

export async function books() {
  return Book.find();
}
```

## Hooking up the resolvers

`resolvers.js`
```js
import { author } from './queries/author';
import { authors } from './queries/authors';
import { book } from './queries/book'; // Add imports
import { books } from './queries/books'; // Add imports
import { createAuthor } from './mutations/createAuthor';
import { createBook } from './mutations/createBook'; // Add imports
import { login } from './mutations/login';
import { signup } from './mutations/signup';
import { user } from './queries/user';
import { users } from './queries/users';

export const resolvers = {
  Query: {
    author,
    authors,
    book, // Add resolvers
    books, // Add resolvers
    users,
    user
  },
  Mutation: {
    createAuthor,
    createBook, // Add resolvers
    login,
    signup,
  },
}; 
```

## Testing

Navigate to `http://localhost:4000/graphql`

Run the following query 

```graphql
query {
  authors {
    _id
    name
  }
}
```

copy and `_id` from an author you added.

Run the following mutation using the author id you got below

```graphql
mutation {
  createBook(
    author: "AUTRHOR_ID_GOES_HERE"
    description: "Very Nice"
    published: "1990"
    title: "Lord Of The Flies"
  ) {
    _id
  }
}
```

You should get a book returned. If you run it again it should error out that the title already exits.

Run your books query to see your newly created book and copy its `_id` for our next query

```graphql
books {
  _id
  author
  description
  published
  title
}
```

Using the `_id` you copied run the following query:

```graphql
query {
  book(_id: "BOOK_ID_GOES_HERE") {
    _id
    author
    description
    published
    title
  }
}
```

## Next

Next we want to be able to the author object itself, currently the resolver returns the id, when we request the `author` field inside the book we want to return the actual author model with its associated fields. 

## Committing to Git

```
git status
git add .
git commit -m "section 14 server book resolvers"
```