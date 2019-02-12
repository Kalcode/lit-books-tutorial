import { User } from '../../db/models/User';

export async function users() {
  return User.find();
}