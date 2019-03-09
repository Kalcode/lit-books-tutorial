import { Author } from '../../db/models/Author';
import { Book as BookModel } from '../../db/models/Book';
import { Review } from '../../db/models/Review';
import { Types } from 'mongoose';

export const Book = {
  author: async function(obj) {
    return Author.findById(obj.author);
  },
  reviews: async function(obj) {
    await BookModel.populate(obj, 'reviews');

    return obj.reviews;
  },
  rating: async function(obj) {
    const results = await Review.aggregate([
      {
        '$match': {
          'book': new Types.ObjectId(obj._id),
        }
      },
      {
        '$group': {
          '_id': null,
          'rating': { '$avg': { '$ifNull': ['$rating', 0] }}
        }
      },
    ]);

    return results[0] ? results[0].rating : 0;
  }
};