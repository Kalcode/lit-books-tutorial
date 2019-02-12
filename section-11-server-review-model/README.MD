# Section 11 Server Review Model
<!-- TOC -->

- [Section 11 Server Review Model](#section-11-server-review-model)
  - [Review](#review)
  - [Review Schema](#review-schema)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Review

The [Review model that we defined earlier](../section-01-planning/Database-Model.MD) has the following properties:

```md
description: String
rating: Number
user: ObjectID
book: ObjectID
```

Here we will hook up the [Author association](https://mongoosejs.com/docs/populate.html) to book and user.

## Review Schema

Create a new file inside `db` folder

`server/src/db/models/Author.js`
```js
import mongoose, { Schema } from 'mongoose';

const reviewSchema = new mongoose.Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  description: String,
  rating: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
},
{ 
  timestamps: true,
});

export const Review = mongoose.model('Review', reviewSchema);
```

here both associations `book` and `user` are only a single relationship. The review belongs to one book and one user.

## Next

Next is adding the associations for the user and book models.

## Committing to Git

```
git status
git add .
git commit -m "section 11 server review model"
```