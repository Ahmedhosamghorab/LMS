import { Router  } from "express";
import { register , login, resendEmailVerificationCode, verifyUser, userProfile } from "../controllers/auth.controller";
import { authenticated } from "../middlewares/auth.middleware";
const router: Router = Router()
router.post("/register", register);
router.post("/login", login);
router.post("/verify-user", verifyUser);
router.post("/resend-code", resendEmailVerificationCode);
router.get("/profile", authenticated , userProfile);
export default router