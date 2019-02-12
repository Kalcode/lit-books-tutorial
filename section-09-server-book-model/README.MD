# Section 9 Server Book Model
<!-- TOC -->

- [Section 9 Server Book Model](#section-09-server-book-model)
  - [Book](#book)
  - [Book Schema](#book-schema)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Book

The [books model that we defined earlier](../section-01-planning/Database-Model.MD) has the following properties:

```md
description: String
title: String
published: Date
image: String
author: ObjectID
reviews: an array of ObjectIDs
```

For now we will define `description`, `title`, `published` and later when we add reviews, authors we will add them to the Book model too and later when we add uploading images. 


## Book Schema

Create a new file inside `db` folder

`server/src/db/models/Book.js`
```js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  description: String,
  title: String,
  published: Date,
},
{ 
  timestamps: true,
});

export const Book = mongoose.model('Book', bookSchema);
```

## Next

Author is the next model we will create.

## Committing to Git

```
git status
git add .
git commit -m "section 9 server book model"
```