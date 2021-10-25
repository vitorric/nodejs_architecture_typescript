import { Schema, Document, Types } from 'mongoose';

import Bank from '@core/entities/Bank';
import { AccessKey } from '@core/entities/Company';
import User from '@core/entities/User';

import conn from '../connection';

export type CompanyDocument = Document & {
  name: string;
  cnpj: string;
  status: boolean;
  deleted: boolean;
  onboardingDone: boolean;
  accessKey: AccessKey;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  userId?: any;
  User?: User;

  banksId?: [any];
  Banks?: [
    {
      bank: Bank;
    }
  ];
};

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    onboardingDone: {
      type: Boolean,
      default: 0,
    },
    accessKey: {
      publicKey: {
        type: String,
      },
      isValid: {
        type: Boolean,
      },
    },
    banksId: [
      {
        type: Types.ObjectId,
        ref: 'Bank',
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
    collection: 'Company',
    timestamps: true,
  }
);

export default conn.model<CompanyDocument>('Company', CompanySchema);
