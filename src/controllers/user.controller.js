import { createConsumer, getConsumerInformationById, verifyOTP } from "../services/consumer.service.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

export async function createUser(req, res) {
  try {
    const newConsumer = await createConsumer(req.body);
    return res.status(201).json(
      new ApiResponse(newConsumer, 201, "Consumer created successfully")
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
