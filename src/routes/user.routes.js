import express from "express"
import { createUser, getConsumer, verifyPhoneOTP } from "../controllers/user.controller.js"
import { ensureToken } from "../middleware/linkcyAuth.middleware.js";

const router = express.Router()


router.route("/signup").post(ensureToken,createUser)
router.route("/verifyOtp").post(ensureToken,verifyPhoneOTP)
router.route("/:consumerId").get(ensureToken,getConsumer)
export default router;