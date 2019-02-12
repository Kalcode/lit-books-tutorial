# Section 11 Server Review Model
<!-- TOC -->

- [Section 11 Server Review Model](#section-11-server-review-model)
  - [Author Resolvers](#author-resolvers)
  - [Author Type](#author-type)
  - [Author Mutation](#author-mutation)
  - [Author Query](#author-query)
  - [Hooking up the resolvers](#hooking-up-the-resolvers)
  - [Testing](#testing)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Author Resolvers

Creating the author mutations and queries will help us start heading to creating books and reviews. When a user adds a book they need to type in an author name. If the author doesn't exist it will add the author and if they do exist it will use that authors `_id`. 

## Author Type

First need to create the type for `Author` in our `typeDefs.js` file.

`server/src/graphql/typeDefs.js`
```graphql
type Author {
  _id: String
  name: String
}
```

We will comeback later to add books when we add the Book type.

## Author Mutation

We need to add the mutation as a type definition:

`server/src/graphql/typeDefs.js`

```graphql
type Mutation {
  createAuthor(name: String!): Author # Add here
  signup(username: String!, password: String!): String
  login(username: String!, password: String!): String
}
```

create a new file under the `mutations` folder called `createAuthor.js`.

```js
import { Author } from '../../db/models/Author';

export async function createAuthor(obj, args) {
  const name = args.name.trim();

  const authorExist = await Author.findOne({
    name: new RegExp(`^${name}$`, 'i'),
  });

  if (authorExist) {
    throw new ApolloError('Author Already Exists');
  }

  const author = await Author.create({
    name,
  });

  return author;
}
```

Here we take in the name trim it. Then we check if the author name already exists in the database by using regex to case insensitive search.

If the author exists we throw an error, else we create the author using the create method.

NOTE: The `create` method is really just two operations together 
```js
const author = new Author({ name }) // creates a instance using the model
await author.save(); // saves the new instance to the database
```

## Author Query

We will add two queries, one for an author and another for all authors.

`server/src/graphql/typeDefs.js`
```graphql
type Query {
  authors: [Author] # Add queries
  author(_id: String!): Author # Add queries
  users: [User]
  user(_id: String!): User
}
```


In our queries create two files: `authors.js` and `author.js`

`authors.js`
```js
import { Author } from '../../db/models/Author';

export async function authors() {
  return Author.find();
}
```

and then 

`author.js`
```js
import { Author } from '../../db/models/Author';

export async function author(obj, args) {
  return Author.findById(args._id);
}
```

## Hooking up the resolvers

In the file `resolvers.js`

```js
import { createAuthor } from './mutations/createAuthor'; // add
import { author } from './queries/author'; // add
import { authors } from './queries/authors'; // add

export const resolvers = {
  Query: {
    author, // Add the resolvers
    authors, // Add the resolvers
    users,
    user
  },
  Mutation: {
    createAuthor, // Add the resolvers
    login,
    signup,
  },
}; 
```

## Testing

As routine now, lets visit `http://localhost:4000/graphql` and create some authors and query for them.

Lets make a mutation with your some author names:

```graphql
mutation {
  createAuthor(name: "James Patterson") {
    _id
    name
  }
}
```

Add a few authors and lets query for them

```graphql
query {
  authors {
    _id
    name
  }
}
```

Grab and `_id` and lets test `author`

```graphql
query {
  author(_id: "5c631723cc12e42a24bbbe43") {
    _id
    name
  }
}
```

The results for all three should be authors. First creates the author and sends it back, the queries should give you a list and the other takes the id and sends back the author that matches the id.

## Next

Next we want to be able to create books.

## Committing to Git

```
git status
git add .
git commit -m "section 13 server author resolvers"
```