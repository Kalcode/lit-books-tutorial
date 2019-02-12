import 'dotenv/config';
import express from 'express';
import jwt from 'express-jwt';
import Mongoose from 'mongoose';

import { createApollo } from './graphql/createApollo';
import { connect } from './db/connect';

// Convert Mongo ObjectId to string
const { ObjectId } = Mongoose.Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

async function start() {
  const app = express();

  const authMiddleware = jwt({
    secret: process.env.JSON_WEB_TOKEN_SECRET,
    credentialsRequired: false,
  });

  app.use(authMiddleware);

  await connect();

  const graphqlServer = createApollo(app);

  app.get('/', (req, res) => {
    return res.send('Root Route');
  });

  const { PORT } = process.env; 

  app.listen({ port: PORT }, () => {
    console.log(`GraphQL Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
  });
}

start();

