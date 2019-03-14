import { Book } from '../../db/models/Book';
import { User } from '../../db/models/User';

export const Review = {
  book: async function(obj) {
    return Book.findById(obj.book);
  },
  user: async function(obj) {
    return User.findById(obj.user);
  }
};