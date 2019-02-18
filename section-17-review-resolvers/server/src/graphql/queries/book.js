import { Book } from '../../db/models/Book';

export async function book(obj, args) {
  return Book.findById(args._id);
}