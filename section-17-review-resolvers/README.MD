# Section 17 Review Resolvers

<!-- TOC -->

- [Section 17 Review Resolvers](#section-17-review-resolvers)
  - [Review](#review)
  - [Review Type Definition](#review-type-definition)
  - [Mutation Create Review](#mutation-create-review)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Review

Reveiw is made up of:

* book
* description
* rating
* user

To create a review we need the user `_id` that made the review, a `description` or the review itself, the `book` `_id` and a rating.

## Review Type Definition

First we need to create a new graphql type for `Review`

`server/src/graphql/typeDefs`
```graphql
type Review {
  _id: String!
  book: Book!
  description: String!
  rating: Int!
  user: User!
}
```

## Mutation Create Review

Still editing our `typeDefs.js` we need to create a new mutation of the root resolver `Mutation`

`server/src/graphql/typeDefs`
```graphql
type Mutation {
  createAuthor(name: String!): Author
  createBook(
    author: String!,
    description: String!,
    published: String!,
    title: String!,
  ): Book
  createReview( # Add Here
    book: String!, # Add Here
    description: String!, # Add Here
    rating: Int!, # Add Here
  ): Review # Add Here
  signup(username: String!, password: String!): String
  login(username: String!, password: String!): String
}
```

To create a review the endpoint requires the book id, description and rating. We will be pulling the user id from the context.

## Next

Now we will create the review resolvers.

## Committing to Git

```
git status
git add .
git commit -m "section 17 review resolvers"
```