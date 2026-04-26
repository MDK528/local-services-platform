import validate from "../../common/middleware/validate.middleware.js";
import Signup from "./dto/signup.dto.js";
import { signInController, signOutController, signUpController, getMeController, refreshAccessTokenController, forgotPasswordController, resetPasswordController, verifyEmailController } from "./auth.controller.js";
import { Router } from 'express'
import Signin from "./dto/signin.dto.js";
import { authenticate } from "./auth.middleware.js";


const router:Router = Router()

router.post('/sign-up', validate(Signup), signUpController)
router.post('/sign-in', validate(Signin), signInController)
router.post('/sign-out', authenticate, signOutController)
router.get("/get-me", authenticate, getMeController)
router.post("/refresh-accesstoken", refreshAccessTokenController)
router.post("/forgot-password", forgotPasswordController)
router.patch("/reset-password", resetPasswordController)
router.patch("/verify-email", verifyEmailController)

export default router