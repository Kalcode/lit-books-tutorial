import { ApolloError } from 'apollo-server-core';

import { Book } from '../../db/models/Book';
import { Author } from '../../db/models/Author';

export async function createBook(obj, args) {
  const { author, description, published, title } = args;

  const validAuthor = await Author.findById(author);

  if (!validAuthor) {
    throw new ApolloError('Invalid Author _id');
  }

  const bookExist = await Book.findOne({
    title: new RegExp(`^${title.trim()}$`, 'i'),
  });

  if (bookExist) {
    throw new ApolloError('Book title already exists.');
  }

  
  const book = await Book.create({
    author,
    description,
    published,
    title: title.trim(),
  });
  
  validAuthor.books.push(book._id);
  await validAuthor.save();

  return book;
}