import { Schema, Document, Types } from 'mongoose';

import { EnumBankFunctions } from '@core/entities/Bank';
import Company from '@core/entities/Company';

import conn from '../connection';

export type BillingRuleDocument = Document & {
  name: string;
  applyTo: EnumBankFunctions;
  sendEmail: boolean;
  status?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // Relations
  companyId: any;
  Company: Company;
};

const BillingRuleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    applyTo: {
      type: String,
      enum: ['Pix', 'BankSlip'],
    },
    sendEmail: {
      type: Boolean,
      required: true,
    },
    companyId: {
      type: Types.ObjectId,
      ref: 'Company',
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
    collection: 'Bank',
    timestamps: true,
  }
);

export default conn.model<BillingRuleDocument>('Bank', BillingRuleSchema);
