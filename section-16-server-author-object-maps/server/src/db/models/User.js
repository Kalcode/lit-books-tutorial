import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
},
{ 
  timestamps: true,
});

export const User = mongoose.model('User', userSchema);