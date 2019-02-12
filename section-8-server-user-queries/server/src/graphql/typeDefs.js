import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: String!): User
  }

  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }

  type User {
    _id: String
    username: String
  }
`;