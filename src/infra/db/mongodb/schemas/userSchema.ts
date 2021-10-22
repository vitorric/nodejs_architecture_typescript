import { Schema, Document, Types } from 'mongoose';

import Company from '@core/entities/Company';

import conn from '../connection';

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  deleted: boolean;
  firstAccessDone: boolean;
  emailValidated: boolean;
  createdAt: Date;
  updatedAt: Date;

  companyId?: string;
  Company?: Company;
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
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
    companyId: {
      type: Types.ObjectId,
      ref: 'Company',
    },
    firstAccessDone: {
      type: Boolean,
      default: 0,
    },
    emailValidated: {
      type: Boolean,
      default: 0,
    },
    status: {
      type: Boolean,
      default: 1,
    },
    deleted: {
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
