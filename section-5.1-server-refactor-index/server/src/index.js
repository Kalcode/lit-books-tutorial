import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { connect } from './db/connect';
import { typeDefs, resolvers } from './graphql';

async function start() {
  const app = express();

  await connect();

  
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  graphqlServer.applyMiddleware({ app }); 
  
  
  app.get('/', (req, res) => {
    return res.send('Root Route');
  });


  const { port } = process.env; 

  app.listen({ port }, () => {
    console.log(`GraphQL Server ready at http://localhost:${port}${graphqlServer.graphqlPath}`);
  });
}

start();

