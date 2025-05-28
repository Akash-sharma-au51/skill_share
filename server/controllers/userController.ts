import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    // check for existing user
    const user = await User.findOne({email})
    if (user) {
        res.status(400).json({
            message:"user already exist",
            success:false
        })
        return;
    }
    // Hash the password
    const hashedpassword = await bcrypt.hash(password,10)
    //create new user
    const newuser = await User.create({
        username,
        email,
        password:hashedpassword
    })

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET as string);
    // new user created
    res.status(201).json({
        message: "User created successfully",
        success: true,
        data: {
            user: newuser,
            token
        }
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

// Login user

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false
      });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false
      });
    }
    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token").status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

export default {
  registerUser,
  loginUser,
  logoutUser
};
