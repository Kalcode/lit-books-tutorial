
import { Author } from '../../db/models/Author';

export async function author(obj, args) {
  return Author.findById(args._id);
}
