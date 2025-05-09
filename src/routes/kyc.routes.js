import express from "express"
import { ensureToken } from "../middleware/linkcyAuth.middleware.js";
import { knowKycStatus, kycRequest, updateKYC } from "../controllers/kyc.controller.js";

const router = express.Router()


router.route("/").post(ensureToken,kycRequest)
router.route("/:kycId")
.get(ensureToken,knowKycStatus)
router.route("/:consumerId").put(ensureToken,updateKYC)

export default router;