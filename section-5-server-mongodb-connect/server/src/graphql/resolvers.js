function sayHello() {
  return 'Hello World';
}

export const resolvers = {
  Query: {
    sayHello,
  }
}; 