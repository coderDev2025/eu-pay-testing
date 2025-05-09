import { createConsumer, getConsumerInformationById, verifyOTP } from "../services/consumer.service.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import Consumer from "../models/consumer.model.js";

export async function createUser(req, res) {
  try {
    // 1. Create consumer on LinkCy
    const linkcyResponse = await createConsumer(req.body);

    // 2. Build local MongoDB record
    const consumerData = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      externalId: req.body.externalId,
      phone: req.body.phone,
      address: req.body.address,
      sourceOfFunds: req.body.sourceOfFunds,
      otherSourceOfFunds: req.body.otherSourceOfFunds,
      occupation: req.body.occupation,
      otherOccupation: req.body.otherOccupation,
      taxIdentificationNumber: req.body.taxIdentificationNumber,
      taxCountry: req.body.taxCountry,
      accountPurposes: req.body.accountPurposes,
      expectedMonthlyExpenses: req.body.expectedMonthlyExpenses,
      metadata: req.body.metadata,
      lastTermsAccepted: req.body.lastTermsAccepted,
      linkcyId: linkcyResponse.id,          // ID returned by LinkCy
      kycStatus: linkcyResponse.kycInfo?.status || 'CREATED', // initial KYC status
    };

    // 3. Save to MongoDB
    const newUser = await Consumer.create(consumerData);

    // 4. Return success
    return res.status(201).json(
      new ApiResponse(newUser, 201, "Consumer created successfully")
    );
  } catch (error) {
    console.error("❌ Error in createUser:", error);
    return res.status(500).json(
      new ApiError(500, error.message || "Failed to create consumer")
    );
  }
}


export async function verifyPhoneOTP(req, res) {
  try {
    const { consumerId, otp } = req.body;

    if (!consumerId || !otp) {
      return res.status(400).json(new ApiError(400, "Please provide OTP and consumerId"));
    }

    const result = await verifyOTP(consumerId, otp);
    return res.status(200).json(new ApiResponse(result, 200, "Phone verified"));

  } catch (error) {
    console.error("❌ OTP verification error:", error.message);
    return res.status(500).json(new ApiError(500, error.message || "Server error"));
  }
}

export async function getConsumer(req, res) {
  try {
    const { consumerId } = req.params;
    const data = await getConsumerInformationById(consumerId);
    return res.status(200).json(new ApiResponse(data, 200, "Consumer data fetched"));
  } catch (error) {
    console.error("❌ Error in getConsumer:", error.message);
    return res.status(500).json(new ApiError(500, error.message || "Failed to fetch consumer"));
  }
}
