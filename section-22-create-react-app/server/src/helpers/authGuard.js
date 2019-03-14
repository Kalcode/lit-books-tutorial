import { AuthenticationError } from 'apollo-server-express';

export function authGuard(next) {
  return function(root, args, context, info) {
    if (!context.user) {
      throw new AuthenticationError('Unauthorized Access');
    }

    return next(root, args, context, info);
  };
}