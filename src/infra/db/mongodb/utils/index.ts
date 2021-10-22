import { Types } from 'mongoose';

export const ObjectIdCast = (_id: string): Types.ObjectId => {
  return new Types.ObjectId(_id);
};
