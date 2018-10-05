const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
})


const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;