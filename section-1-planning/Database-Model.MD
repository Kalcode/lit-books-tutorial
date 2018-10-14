# Database Modeling

<!-- TOC -->

- [Database Modeling](#database-modeling)
  - [User](#user)
      - [Model datatypes](#model-datatypes)
      - [Relationships](#relationships)
  - [Review](#review)
      - [Model datatypes](#model-datatypes-1)
      - [Relationships](#relationships-1)
  - [Book](#book)
      - [Model datatypes](#model-datatypes-2)
      - [Relationships](#relationships-2)
  - [Author](#author)
      - [Model datatypes](#model-datatypes-3)
      - [Relationships](#relationships-3)
  - [Reference Image](#reference-image)

<!-- /TOC -->

We need to take the application requirements and turn them into database models we will need.

## User

A user will need to be able to sign up with a username and a password. That user will also be able to review books.

So a `user` needs
- a `username`
- a `password`
- a lists of `reviews`

`username` can be represented as a string, the same with the `password`.

#### Model datatypes

`reviews` will need to be an array of ids, referencing another model in our database we are going to design. [In MongoDB this is a `ObjectID` type](https://docs.mongodb.com/manual/reference/method/ObjectId/).

A User model will have the following then:
- `username`: `String`
- `password`: `String`
- `reviews`: `Array` of `ObjectID`s

We will also include `timestamp` metadata:
- `create_at`: `Date`
- `updated_at`: `Date`

All of our models will include [timestamp metadata](https://mongoosejs.com/docs/guide.html#timestamps).

#### Relationships

The review relationship we call a [`has-many` in this case a 'one-to-many'](https://en.wikipedia.org/wiki/One-to-many_(data_model)), because the `User` will have many references to `reviews`. This is cause a User can review multiple books. So they own many reviews.

## Review

A review will have a description of the review and the number given. Could be a point system (1-10) or a star (0 - 5). The review will have a description of the rating given or reason why.

A review is associated with a user who created it and a book the review is attached to.

So a `review` needs
- a `description`
- a `rating`
- a `user` reference
- a `book` reference

#### Model datatypes
`description` can be represented as a `String`, a `rating` will be a `Number`.
`user` will be a reference to the user who created it. `book` willbe a reference to the book the review is refering to.

A Review model will have the following then:
- `description`: `String`
- `rating`: `Number`
- `user`: `ObjectID`
- `book`: `ObjectID`

We will also include `timestamp` metadata:
- `create_at`: `Date`
- `updated_at`: `Date`

#### Relationships

The user is a `one-to-many`, where the review `has one` user, but user `has many` reviews. This is what we call `has one` or `belongs to` when discussing just the relationship to the `user` from the `review`. Again cause the review `has one` user it's associated with. 

The same relationship goes for `book`. Review `has one` book it belongs to, or the review `belongs to` a book. The book and review has a `one-to-many` relationship. Where the `book` will have many `reviews` but a `review` belongs to one `book`.

## Book

A book will have a title, a description of the book, a published date, and image. It will also have a list of review and an author.

A book is associated with a author who wrote it. A book also assoaicted with many reviews that users have wrtten about it.

So a `book` needs
- a `description`
- a `title`
- an `image`
- a `published` date
- a `author` reference
- a list of `reviews`

#### Model datatypes
`description` can be represented as a `String`, a 'title' will be a `String`, an `image` will be a string that represents a path/url to the image that gets uploaded. The `published` will be a Date

`author` will be a reference to the author who created it. `reviews` will be a list of reviews written about the book.

A Book model will have the following then:
- `description`: `String`
- `title`: `String`
- `published`: `date`
- `image`: `String`
- `author`: `ObjectID`
- `reviews`: an array of `ObjectID`s

We will also include `timestamp` metadata:
- `create_at`: `Date`
- `updated_at`: `Date`

#### Relationships

The book is a `one to many` relationship with the `author`. As the author can have written many books, but the book is written by one author. 

*NOTE: Although books can have more than one author, we will use a single author in this app. If a user wants to include multiple authors they can write two authors as one `Neil Gaiman and Terry Pratchett` whould be another author an entry. Where `Neil Gaiman` would be another author in our app.*

*// TODO Add an after course extension where they can learn to refactor using a `many-to-many` relationship and implement a multi tagging author system. Using migiration to preserve current authors and carry over to new `authors` field*

The reviews is a `one-to-many` relationship with the `book` as the book can have many reviews but the review only refers to one book.

## Author

The author will be straight forward. The author has a name and a list of books they wrote.

So a `author` needs
- a `name`
- a list of `books`

#### Model datatypes
`name` can be represented as a `String`, and `books` will be a reference to a list of books.

A Book model will have the following then:
- `name`: `String`
- `books`: an array of `ObjectID`s

We will also include `timestamp` metadata:
- `create_at`: `Date`
- `updated_at`: `Date`

#### Relationships

The author is a `one to many` relationship with the `books`. As the author has many books but the book only has one writer.

## Reference Image

![Entity–relationship model](lit-books-entity-relationship-diagram.png?raw=true "Entity–relationship model")