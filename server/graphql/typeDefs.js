const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    _id: String!
    username: String!
    email: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    signup (username: String!, email: String!, password: String!): String
    login (email: String!, password: String!): String
  }
`

module.exports = typeDefs;