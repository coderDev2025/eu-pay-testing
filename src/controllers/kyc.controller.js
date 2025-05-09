import { createKycRequest, getKycStatus, updateKycStatus } from "../services/kyc.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export async function kycRequest(req,res) {
    try {
        console.log(req.body)
        const {endUserId} = req.body;
        if(!endUserId)return res.status(400).json({message:"please provide enduserId"})
       const response = await createKycRequest(endUserId)
       return res.status(201).json({message:"kyc request is created",data:response})
    } catch (error) {
        res.status(500).json({message:"error in kyc request"})
    }
}

export async function updateKYC(req,res) {
    try {
        const {consumerId} = req.params
        if(!consumerId)return res.status(400).json(new ApiError(400,"please provide a valid id"))
      const response =   await updateKycStatus(consumerId)   
      return res.status(201).json(new ApiResponse(response,201,"kyc verified"))
    } catch (error) {
        res.status(500).json(new ApiError(500,error.message||"failed to update kyc"))
    }
}

export async function knowKycStatus(req,res) {
 try {
    const {kycId} = req.params
    const response = await getKycStatus(kycId)
    return res.status(200).json(new ApiResponse(response,200,"kyc details fetched"));
 } catch (error) {
    res.status(500).json(new ApiError(500,error.message||"failed to know kyc status"))
 }   
}