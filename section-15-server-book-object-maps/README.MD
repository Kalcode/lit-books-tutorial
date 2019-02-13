# Section 15 Server Book Object Maps
<!-- TOC -->

- [Section 11 Server Review Model](#section-11-server-review-model)
  - [Book Resolvers](#book-resolvers)
  - [Book Type definitions](#book-type-definitions)
  - [Resolvers](#resolvers)
  - [Book queries](#book-queries)
  - [Hooking up the resolvers](#hooking-up-the-resolvers)
  - [Testing](#testing)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Resolver Maps - Object Mapping

`Query` and `Mutation` types describes the root resolvers. These are the resolvers used for entry into your endpoints. 

Example is `books` query. There is no way to directly query the type `Book`, instead we put a query called `books` on the root resolver type `Query`. This returns a array of `Books`.

Books also have a field called `author` that currently returns the author's id associated with the book. We want to return the actualy object in the database of that author, so we need a resolver to get that.

Outside of root resolvers we can have resolvers for different Type's fields. We will call these `object-map` resolvers, their job is to help map the object with its correct return type.

When we request a book we should be able to get their author like so:

```graphql
query {
  books {
    author {
      name
    }
  }
}
```

This would return a list of books and their associated author's name.

## Book's author resolver

We will create a new folder called `object-maps` under `graphlql` folder.

`server/src/graphql/object-maps`

Inside this folder we will create a file that is the same name as the `Type`. In this case we will create `Book.js`.

`server/src/graphql/object-maps/Book.js`

In the file we will create an object with functions

```js
import { Author } from '../../db/models/Author';

export const Book = {
  author: async function(obj) {
    return Author.findById(obj.author);
  }
};
```

We have an object called Book and it has a property called `author` that uses an async function to return a promise that finds the author by their id. 

The first argument `obj` or sometimes called `parent` is the previous object. In this case when we query books, the `obj` is the actual book return from the database from our resolver `books`.

So we have access to all the properties on that model including `obj.author` which is the id we saved in the database.

Then use that to fetch the author and return it.

## Hooking up the resolver

In `resolver.js` we need to hook up the object mapping for `Book`. So when we called `author` in a query it runs the resolver for `Book`'s author.

`server/src/graphql/resolvers.js`
```js
import { Book } from './object-maps/Book'; // Add to import list

export const resolvers = {
  Book, // add here
  Query: {
    author,
    authors,
    book,
    books,
    users,
    user
  },
  Mutation: {
    createAuthor,
    createBook,
    login,
    signup,
  },
}; 
```

## Uodating Type Definition

The type definition needs to be updated to tell Graphql the author field is going to return an `Author` instead of a `String`

`server/src/graphql/typeDefs.js`
```graphql
type Book {
  _id: String!
  author: Author! # Change from String! to Author!
  description: String!
  published: String!
  title: String!
}
```

## Testing 

Navigate to `http://localhost:4000/graphql` and try querying for books with authors

```graphql
query {
  books {
    title
    author {
      _id
      name
    }
  }
}
```

Instead of an id returning for author an object should return similar to the shape:

```json
{
  "data": {
    "books": [
      {
        "title": "Lord of Winds",
        "author": {
          "_id": "5c645ff9ca45fd12ee4efcdc",
          "name": "Jameson Petterson"
        }
      }
    ]
  }
}
```

## Next

Whenever a book is added, we add the author to the book, we want the book to get added to the author too. We will also hook up the object mapping for author for a new field called `books`.

## Committing to Git

```
git status
git add .
git commit -m "section 14 server book object maps"
```