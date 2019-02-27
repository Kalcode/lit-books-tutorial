import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    author(_id: String!): Author
    authors: [Author]
    
    book(_id: String!): Book
    books: [Book]
    
    review(_id: String!): Review
    reviews: [Review]
    
    user(_id: String!): User
    users: [User]
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
    reviews: [Review]
    title: String!
    rating: Int!
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
    reviews: [Review]
  }
`;