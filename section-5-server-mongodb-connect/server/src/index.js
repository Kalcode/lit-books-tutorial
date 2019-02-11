import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose'; // Add import here

import { typeDefs, resolvers } from './graphql';

// Connect to mongoDB here
mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Connected to MongoDB');
  });

const app = express();

app.get('/', (req, res) => {
  return res.send('Root Route');
});


const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

graphqlServer.applyMiddleware({ app }); 

const { PORT } = process.env; 

app.listen({ port }, () => {
  console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
});