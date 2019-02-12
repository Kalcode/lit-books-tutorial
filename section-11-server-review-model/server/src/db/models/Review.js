import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  description: String,
  rating: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
},
{ 
  timestamps: true,
});

export const Review = mongoose.model('Review', reviewSchema);