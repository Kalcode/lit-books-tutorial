# Section 16 Server Author Object Maps

<!-- TOC -->

- [Section 16 Server Author Object Maps](#section-16-server-author-object-maps)
  - [Author books Resolver](#author-books-resolver)
  - [Updating the type definiton](#updating-the-type-definiton)
  - [Hooking up the resolver](#hooking-up-the-resolver)
  - [Testing](#testing)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Author books Resolver

We need to create a new file under `object-maps` called `Authors`.

```js
import { Author as AuthorModel } from '../../db/models/Author';

export const Author = {
  books: async function(obj) {
    await AuthorModel.populate(obj, 'books');

    return obj.books;
  }
};
```

We will use a different approach to getting the books associated with the author. Import `Author` model, so it doesn't clash with the object `Author` in the same file we will [rename it on import `AuthorModel` using the import `as`.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Rename_multiple_exports_during_import);

[`AutorModel` has a method called `populate`](https://mongoosejs.com/docs/populate.html) where we can pass the object and tell it what field we want to populate. We then want to return the objects `graphql` is expecting, which is the array of books, `obj.books`.

Important to note here is that before we call `populate` `books` on `obj` is an array of id strings. When we call populate it mutates the obj in place with the actual array of book objects.

## Updating the type definiton

We need to update the typedefs so graphql knows we have a new field we can request.

`server/src/graphql/typeDefs`
```graphql
type Author {
  _id: String
  books: [Book] # Add this line
  name: String
}
```

## Hooking up the resolver

Once again we need to go to `resolvers.js` and add our new object.

`resolvers.js`
```js
import { Author } from './object-maps/Author'; // Add new line here

export const resolvers = {
  Author, // Add new line here
  Book,
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

Once again we import or resolver, in this case an object `Author` with a resolver called `books`.

## Testing

Navigate to `http://localhost:4000/graphql` and run the following query

```graphql
{
  authors {
    _id
    name
    books {
      _id
      description
      title
      published
    }
  }
}
```

This should return an author with a array of their books.

Similar in shape as below:

```json
{
  "data": {
    "authors": [
      {
        "_id": "5c645ff9ca45fd12ee4efcdc",
        "name": "Jameson Petterson",
        "books": [
          {
            "_id": "5c648c98e9deb3b43bf84176",
            "description": "Test info",
            "title": "Lord of Stuff",
            "published": "1998"
          },
          {
            "_id": "5c648ddc733009b57835a278",
            "description": "The sequel to the hit book lord of Stuff",
            "title": "Lord of Stuff 2",
            "published": "2003"
          }
        ]
      }
    ]
  }
}
```

## Next

Now we will create the review resolvers.

## Committing to Git

```
git status
git add .
git commit -m "section 16 serverauthor object maps"
```