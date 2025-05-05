import express from "express"
import { createUser } from "../controllers/user.controller.js"
import { ensureToken } from "../middleware/linkcyAuth.middleware.js";

const router = express.Router()


router.route("/signup").post(ensureToken,createUser)

export default router;