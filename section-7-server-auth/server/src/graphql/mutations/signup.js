import { AuthenticationError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { User } from '../../db/models/User';

export async function signup(obj, args) {
  const { username, password } = args;
 
  const user = await User.findOne({ username });

  if (user) {
    throw new AuthenticationError('Username invalid or already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword,
  });

  return jsonwebtoken.sign(
    {
      _id: newUser._id,
      username: newUser.username,
    },
    process.env.JSON_WEB_TOKEN_SECRET,
    { expiresIn: '1d' },
  );
}