import 'dotenv/config';
import express from 'express';

import { createApollo } from './graphql/createApollo';
import { connect } from './db/connect';

async function start() {
  const app = express();

  await connect();

  const graphqlServer = createApollo(app);

  app.get('/', (req, res) => {
    return res.send('Root Route');
  });

  const { port } = process.env; 

  app.listen({ port }, () => {
    console.log(`GraphQL Server ready at http://localhost:${port}${graphqlServer.graphqlPath}`);
  });
}

start();

