import mongoose, { Schema } from 'mongoose';

const bookSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  description: String,
  title: String,
  published: Date,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
},
{ 
  timestamps: true,
});

export const Book = mongoose.model('Book', bookSchema);