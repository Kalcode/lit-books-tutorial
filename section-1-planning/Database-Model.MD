# Database Modeling

<!-- TOC -->

- [Database Modeling](#database-modeling)
  - [User](#user)
      - [Model datatypes](#model-datatypes)
      - [Relationships](#relationships)
  - [Review](#review)
      - [Model datatypes](#model-datatypes-1)
      - [Relationships](#relationships-1)
  - [Reference Image](#reference-image)

<!-- /TOC -->

We need to take the application requirements and turn them into database models we will need.

## User

A user will need to be able to sign up with a username and a password. That user will also be able to review books.

So a user needs
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

So a review needs
- a `description`
- a `rating`
- a `user` reference
- a `book` reference

#### Model datatypes
`description` can be represented as a `String`, a `rating` will be a `Number`.
`user` will be a reference to the user who created it and a reference to the book the review is referring to.

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

## Reference Image

![Entity–relationship model](lit-books-entity-relationship-diagram.png?raw=true "Entity–relationship model")