import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.modal.js"


const generateAccessTokenHere = async (userId) => {
    try {
        const user = await User.findById(userId);
        console.log("I am user of acccesstoken");
        console.log(user);
        const accessToken = user.generateAccessToken();
        console.log("access token" , accessToken);
        return {accessToken};

    } catch (error) {
        throw new ApiError(500, "Could not generate access token");
    }
}

const ready = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "It is a sucess"))
})

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

    // Inside signUpUser function

const accessToken  = await generateAccessTokenHere(user._id);
if (!accessToken) throw new ApiError(500, "Access token generation failed");

const createdUser = await User.findById(user._id).select("-password");
if (!createdUser) throw new ApiError(500, "User not found after creation");

const options = {
    httpOnly: true, // Ensures the cookie is only accessible through HTTP requests
    secure: false // Set to true in production for HTTPS
};

return res
    .status(200)
    .cookie("accessToken", accessToken, options) // Set the accessToken in the cookie
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { signUpUser, ready }