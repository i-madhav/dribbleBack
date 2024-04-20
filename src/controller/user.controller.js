import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.modal.js"

const signUpUser = asyncHandler(async (req, res) => {
    // get user from frontend
    // verify the user information
    // means check if has not leave any field empty
    //create user
    // return response
    const { name, userName, email, password } = req.body;
    if ([name, userName, email, password].some((field) => !field?.trim())) throw new ApiError(400, "Fields are empty")

    const user = await User.create({
        name,
        userName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password")
    console.log(createdUser);
    if (!createdUser) throw new ApiError(500, "Not Able to found the user");

    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User Created  Successfully"));
});

export { signUpUser }