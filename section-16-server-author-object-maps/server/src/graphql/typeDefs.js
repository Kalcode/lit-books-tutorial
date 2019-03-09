import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    authors: [Author]
    author(_id: String!): Author
    book(_id: String!): Book
    books: [Book]
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

  type User {
    _id: String
    username: String
  }
`;