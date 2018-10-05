const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const mongoose = require('mongoose')

mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

mongoose.connect('mongodb://localhost:27017/bookit').then(() =>{
  console.log('Connected to MongoDB!');
})

const app = express();

const auth = jwt({
  secret: 'SomeDirtySecret',
  credentialsRequired: false,
})

app.use(auth);

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      user: req.user,
    }
  }
});

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);