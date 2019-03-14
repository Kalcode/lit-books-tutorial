import jsonwebtoken from 'jsonwebtoken';

export function currentUser(obj, args, context) {
  const { newToken } = args;
  const { user } = context;

  if (user && newToken) {
    const token = jsonwebtoken.sign(
      { 
        _id: user._id,
        username: user.username,
      },
      process.env.JSON_WEB_TOKEN_SECRET,
      { expiresIn: '1d' },
    );

    return {
      ...user,
      token,
    };
  }

  return user;
}