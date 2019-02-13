import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  description: String,
  title: String,
  published: String,
},
{ 
  timestamps: true,
});

export const Book = mongoose.model('Book', bookSchema);