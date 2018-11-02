import 'dotenv/config'

import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { typeDefs, resolvers } from './graphql';

const app = express();

app.get('/', (req, res) => {
  return res.send('Root Route');
});


const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

graphqlServer.applyMiddleware({ app }); 

const { port } = process.env; 

app.listen({ port }, () => {
  console.log(`GraphQL Server ready at http://localhost:${port}${graphqlServer.graphqlPath}`);
});