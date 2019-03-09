import { Book } from '../../db/models/Book';

export async function books() {
  return Book.find();
}