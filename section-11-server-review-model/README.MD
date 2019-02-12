# Section 10 Server Author Model
<!-- TOC -->

- [Section 10 Server Author Model](#section-10-server-author-model)
  - [Author](#author)
  - [Author Schema](#author-schema)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Author

The [author model that we defined earlier](../section-1-planning/Database-Model.MD) has the following properties:

```md
name: String
books: an array of ObjectIDs
```

Here we will hook up the [Author association](https://mongoosejs.com/docs/populate.html) to books.

## Author Schema

Create a new file inside `db` folder

`server/src/db/models/Author.js`
```js
import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
},
{ 
  timestamps: true,
});

export const Author = mongoose.model('Author', authorSchema);
```

on the `books` field we use an array `[]` and an object inside to define the association. Here we are saying an array of Book types.

## Next

Author is the next model we will create.

## Committing to Git

```
git status
git add .
git commit -m "section 8 server user queries"
```