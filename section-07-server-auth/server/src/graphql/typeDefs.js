import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    sayHello: String
  }

  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }
`;