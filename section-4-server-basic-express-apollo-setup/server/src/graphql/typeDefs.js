import { gql } from 'apollo-server-express';

// Here we define our types
export const typeDefs = gql`
  # This defines our Query, which is the root queries you can
  # call, in localhost:port/graphql this represents
  # query {
  #   sayHello  
  # }
  type Query {
    sayHello: String
  }
`;