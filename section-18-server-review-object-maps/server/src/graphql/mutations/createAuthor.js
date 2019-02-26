import { Author } from '../../db/models/Author';
import { ApolloError } from 'apollo-server-core';

export async function createAuthor(obj, args) {
  const name = args.name.trim();

  const authorExist = await Author.findOne({
    name: new RegExp(`^${name}$`, 'i'),
  });

  if (authorExist) {
    throw new ApolloError('Author Already Exists');
  }

  const author = await Author.create({
    name,
  });

  return author;
}