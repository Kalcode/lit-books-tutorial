import { ApolloServer } from 'apollo-server-express';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export function createApollo(app) {
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  graphqlServer.applyMiddleware({ app }); 

  return graphqlServer;
}