# Section 11 Server book user assocations
<!-- TOC -->

- [Section 11 Server book user assocations](#section-11-server-book-user-assocations)
  - [User Associations](#user-associations)
  - [Book Associations](#book-associations)
  - [Context](#context)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## User Associations

The user needs a relationship with many reviews

`server/src/db/models/User.js`
```js
import mongoose from 'mongoose';
const { Schema } = mongoose; // Update import

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // Add this line
},
{ 
  timestamps: true,
});
```

Like with the `books` here we have an association with an array of `reviews`.

## Book Associations

The book needs a relationship with many reviews and a relationship with an author.

`server/src/db/models/Book.js`
```js
import mongoose from 'mongoose';
const { Schema } = mongoose; // Update Import

const bookSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Author' }, // Add relationship
  description: String,
  title: String,
  published: Date,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // Add relationship
},
{ 
  timestamps: true,
});

```

## Context

Now that we have associations defined we can simply add an `_id` to associate the models. Then when we query for that association mongoose knows how to look up that association and return the relevant related data.

## Next

Next is we can want to create mutations and queries for creating and getting an Author. 

## Committing to Git

```
git status
git add .
git commit -m "section 12 server book user assocations"
```