import { Resend } from "resend";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.modal.js";

const resend = new Resend('re_KHL8QkgS_L5nqHRFX34sMYdb5cEzRPJcY');

const email = asyncHandler(async (req, res) => {
    console.log(req.user);
    const user =  await User.findById( req.user._id)
    console.log(user.email);
    await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to:user.email,
        subject: "Internship Project dribbble",
        text: "This mail is send you by madhav sharma. I am very hardworking guy and will be a great assest to your organisation . I took only 2 days to finish this project . Thank You!"
    })

    console.log("i send my myself");

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "ok"))
})

export { email };
