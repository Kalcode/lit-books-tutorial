import { AuthenticationError, ApolloError } from 'apollo-server-core';

import { Book } from '../../db/models/Book';
import { Review } from '../../db/models/Review';
import { User } from '../../db/models/User';

export async function createReview(obj, args, context) {
  const { book, description, rating } = args;

  const { user } = context;

  if (!user) {
    throw new AuthenticationError('Unauthorized or Invalid token');
  }

  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    throw new ApolloError('User not found');
  }

  const foundBook = await Book.findById(book);

  if (!foundBook) {
    throw new ApolloError('Invalid Book Id');
  }

  const alreadyReviewed = await Review.findOne({
    user: user._id,
    book: book,
  });

  if (alreadyReviewed) {
    throw new ApolloError('User has already reviewed this book');
  }

  const review = await Review.create({
    book,
    description,
    rating,
    user: user._id,
  });

  // Add review to book's reviews
  foundBook.reviews.push(review._id);
  await foundBook.save();

  // Add review to user's reviews
  foundUser.reviews.push(review._id);
  await foundUser.save();

  return review;
}