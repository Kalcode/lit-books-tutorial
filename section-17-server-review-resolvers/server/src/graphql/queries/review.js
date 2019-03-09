import { Review } from '../../db/models/Review';

export async function review(obj, args) {
  return Review.findById(args._id);
}