const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const UserModel = require('../db/UserModel')

const resolvers = {
  Query: {
    currentUser: async (_, args, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated');
      }

      return UserModel.findById(user._id);
    }
  },

  Mutation: {
    signup: async(_, { username, email, password }) => {
      let user = await UserModel.findOne({ username });

      if (user) {
        throw new Error('User already exists');
      }

      user = await UserModel.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      return jsonwebtoken.sign(
        { _id: user._id, email: user.email, username: user.username },
        "SomeDirtySecret",
        { expiresIn: '1d' },
      );
    },

    login: async (_, { email, password }) => {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error('User does not exist');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      return jsonwebtoken.sign(
        { _id: user._id, email: user.email, username: user.username },
        "SomeDirtySecret",
        { expiresIn: '1d' },
      );
    }
  } 
}

module.exports = resolvers