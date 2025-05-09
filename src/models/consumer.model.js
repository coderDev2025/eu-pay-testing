import mongoose from "mongoose";

const consumerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  externalId: { type: String, required: true, unique: true },
  phone: {
    countryCode: { type: String, required: true },
    number: { type: String, required: true }
  },
  address: {
    isoCountryCode: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    refinement: { type: String },
    stateOrProvince: { type: String, required: true },
    bypassVerification: { type: Boolean, default: false }
  },
  sourceOfFunds: { type: String, required: true },
  otherSourceOfFunds: { type: String },
  occupation: { type: String, required: true },
  otherOccupation: { type: String },
  taxIdentificationNumber: { type: String, required: true },
  taxCountry: { type: String, required: true },
  accountPurposes: { type: [String], required: true },
  expectedMonthlyExpenses: {
    value: { type: String, required: true },
    currency: { type: String, required: true }
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  lastTermsAccepted: { type: String },
  linkcyId: {
    type: String, // ID received from LinkCy after creation
    unique: true,
    sparse: true
  },
  kycStatus: {
    type: String,
    enum: [
      'NOT_STARTED',
      'CREATED',
      'PROCESSING',
      'ABORTED',
      'PENDING_REVIEW',
      'VALIDATED',
      'DECLINED'
    ],
    default: 'NOT_STARTED'
  },
  ledgerCreated: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Consumer = mongoose.model("Consumer", consumerSchema);
export default Consumer;
