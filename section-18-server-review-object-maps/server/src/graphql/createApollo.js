import { ApolloServer } from 'apollo-server-express';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export function createApollo(app) {
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async function(stuff) {
      // console.log(stuff);
      return {
        user: stuff.req.user,
      };
    },
  });
  
  graphqlServer.applyMiddleware({ app }); 

  return graphqlServer;
}