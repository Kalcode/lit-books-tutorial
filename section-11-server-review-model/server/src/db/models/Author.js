import mongoose, { Schema } from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
},
{ 
  timestamps: true,
});

export const Author = mongoose.model('Author', authorSchema);