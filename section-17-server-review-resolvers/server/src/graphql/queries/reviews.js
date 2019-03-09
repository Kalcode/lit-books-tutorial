import { Review } from '../../db/models/Review';

export async function reviews() {
  return Review.find();
}