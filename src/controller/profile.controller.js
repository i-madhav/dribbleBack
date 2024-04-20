import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Profile } from "../models/profile.modal.js";
import { uploadOnCloudnary } from "../utils/cloudinaryUpload.js";

const profileHere = asyncHandler(async (req, res) => {
    const { location } = req.body;
    if (!location) throw new ApiError(401, "Fields are empty");
    console.log(req.files);
    if (!req.files) throw new ApiError(404, "unable to upload file");

    const avatarLocalPath = req.files?.imageUrl[0]?.path;
    console.log("This is path", avatarLocalPath);
    if (!avatarLocalPath) throw new ApiError(404, "Local file path not found");

    const avatar = await uploadOnCloudnary(avatarLocalPath);
    if (!avatar) throw new ApiError(401, "Enable to upload image to cloudinary");
    const profile = await Profile.create({
        location,
        imageUrl: avatar.secure_url
    });

    const profileCreated = await Profile.findById(profile._id);

    return res
        .status(200)
        .json(new ApiResponse(200, profileCreated, "Profile created successfully"))
});

export { profileHere };