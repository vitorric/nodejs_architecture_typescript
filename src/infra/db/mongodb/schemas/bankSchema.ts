import { Schema, Document } from 'mongoose';

import { BankFunctions } from '@core/entities/Bank';

import conn from '../connection';

export type BankDocument = Document & {
  name: string;
  bankFunctions: [BankFunctions];
  status?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

const BankSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bankFunctions: [
      {
        name: {
          type: String,
          required: true,
        },
        urlDoc: {
          type: String,
          required: true,
        },
        urlAsync: {
          type: String,
        },
        urlSync: {
          type: String,
        },
      },
    ],
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
    collection: 'Bank',
    timestamps: true,
  }
);

export default conn.model<BankDocument>('Bank', BankSchema);
