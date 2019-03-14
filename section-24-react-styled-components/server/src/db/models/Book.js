import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  description: String,
  title: String,
  published: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
},
{ 
  timestamps: true,
});

export const Book = mongoose.model('Book', bookSchema);