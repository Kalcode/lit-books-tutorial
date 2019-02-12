// a function to return 'hello world' when called
function sayHello() {
  return 'Hello World';
}

// this defines our resolvers, it takes Query, Mutation object.
// The query mirrors our typedefs query.  
export const resolvers = {
  Query: {
    sayHello,
  }
}; 