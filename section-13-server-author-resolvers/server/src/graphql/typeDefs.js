import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    authors: [Author]
    author(_id: String!): Author
    users: [User]
    user(_id: String!): User
  }

  type Mutation {
    createAuthor(name: String!): Author
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }

  type Author {
    _id: String
    name: String
  }

  type User {
    _id: String
    username: String
  }
`;