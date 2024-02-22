import { User } from "../models/user.model.js"

// Register a user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    // validators
    if ([username, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required!" })
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] })

    if (existedUser) {
      return res.status(409).json({
        message: "User with email or username already exists!",
      })
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
    })

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
      return res.status(500).json({
        message: "Something went wrong while creating a user",
      })
    }

    setTimeout(() => {
      return res.status(201).json({
        success: true,
        user: createdUser,
        mssg: "User registered successfully",
      })
    }, 1500)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" })
  }
}

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    // validators
    if ([email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required!" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "Invalid email address!",
      })
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid user credentials!",
      })
    }

    const access_Token = await user.generateAccessToken()

    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
      httpOnly: true,
      secure: true,
    }

    setTimeout(() => {
      return res.status(200).cookie("accessToken", access_Token, options).json({
        success: true,
        user: loggedInUser,
        mssg: "User Logged In Successfully",
      })
    }, 1500)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" })
  }
}

const logoutUser = async (_, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    }

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .json({ message: "User Logged Out" })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" })
  }
}

export { registerUser, loginUser, logoutUser }
