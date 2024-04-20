import { Router } from "express";
import { ready, signUpUser } from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { profileHere } from "../controller/profile.controller.js";
import { email } from "../controller/email.controller.js";
import { verifyJWT } from "../middleware/verify.middleware.js";

const router = Router();
router.route("/").get(ready)
router.route("/signup").post(signUpUser);
router.route("/profile").post(
    upload.fields([
        {
            name: "imageUrl",
            maxCount: 1
        }
    ]),
    profileHere);
router.route("/email").get(verifyJWT,email);

export default router;