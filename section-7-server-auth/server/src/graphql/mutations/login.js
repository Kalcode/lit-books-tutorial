import { AuthenticationError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { User } from '../../db/models/User';

export async function login(obj, args, context) {
  const { username, password } = args;
 
  console.log(context);

  const user = await User.findOne({ username });

  if (!user) {
    throw new AuthenticationError('Invalid Username or Password');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new AuthenticationError('Invalid Username or Password');
  }

  return jsonwebtoken.sign(
    { 
      _id: user._id,
      username: user.username,
    },
    process.env.JSON_WEB_TOKEN_SECRET,
    { expiresIn: '1d' },
  );
}