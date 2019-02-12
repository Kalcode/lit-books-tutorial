import { User } from '../../db/models/User';

export async function user(obj, args) {
  return User.findById(args._id);
}