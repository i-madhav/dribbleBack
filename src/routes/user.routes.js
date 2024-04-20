import { Router } from "express";
import { ready, signUpUser } from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { profileHere } from "../controller/profile.controller.js";

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

export default router;