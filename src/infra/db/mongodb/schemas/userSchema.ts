import { Schema, Document } from 'mongoose';

import conn from '../connection';

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin'],
      required: true,
    },
    status: {
      type: Boolean,
      default: 1,
    },
    delete: {
      type: Boolean,
      default: 0,
    },
  },
  {
    collection: 'User',
    timestamps: true,
  }
);

export default conn.model<UserDocument>('User', UserSchema);
