import { ApolloServer } from 'apollo-server-express'; // Importing Apolloserver from the apollo package
import express from 'express'; // Importing the express function need to create a server

// Importing our types and resolvers for graphql server
import { typeDefs, resolvers } from './graphql';

// creating the express server app
const app = express();

// setting a root route
app.get('/', (req, res) => {
  return res.send('Root Route'); // sending the string 'Root Route' to the requesting browser
});

// creating the graphql server
const graphqlServer = new ApolloServer({
  typeDefs, // passing in our types
  resolvers, // passing in our resolvers
});

graphqlServer.applyMiddleware({ app }); // attaching the graphql server to our express server

const port = 4000; // defining the port we want to use, this will be moved to env file later

// calling our express server to start and listen on the designated port
app.listen({ port }, () => {
  console.log(`GraphQL Server ready at http://localhost:${port}${graphqlServer.graphqlPath}`);
});