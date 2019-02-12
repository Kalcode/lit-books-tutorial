import { Author } from '../../db/models/Author';

export async function authors() {
  return Author.find();
}