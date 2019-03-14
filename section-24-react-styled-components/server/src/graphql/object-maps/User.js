import { User as UserModel } from '../../db/models/User'

export const User = {
  reviews: async (obj) => {
    await UserModel.populate(obj, 'reviews');

    return obj.reviews;
  }
}