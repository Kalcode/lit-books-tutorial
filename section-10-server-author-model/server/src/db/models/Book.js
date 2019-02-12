import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  description: String,
  title: String,
  published: Date,
},
{ 
  timestamps: true,
});

export const Book = mongoose.model('Book', bookSchema);