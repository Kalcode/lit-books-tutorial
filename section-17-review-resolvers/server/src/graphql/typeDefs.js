import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    authors: [Author]
    author(_id: String!): Author
    book(_id: String!): Book
    books: [Book]
    reviews: [Review]
    users: [User]
    user(_id: String!): User
  }

  type Mutation {
    createAuthor(name: String!): Author
    createBook(
      author: String!,
      description: String!,
      published: String!,
      title: String!,
    ): Book
    createReview(
      book: String!,
      description: String!,
      rating: Int!,
    ): Review
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }

  type Author {
    _id: String
    books: [Book]
    name: String
  }

  type Book {
    _id: String!
    author: Author!
    description: String!
    published: String!
    title: String!
  }

  type Review {
    _id: String!
    book: Book!
    description: String!
    rating: Int!
    user: User!
  }

  type User {
    _id: String
    username: String
  }
`;