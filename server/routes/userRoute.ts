import express  from "express"
import { Request, Response, NextFunction, RequestHandler } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController";



const router = express.Router()
// User registration route
router.post("/register", registerUser as RequestHandler);
// User login route
router.post("/login", loginUser as RequestHandler);

// User logout route
router.post("/logout", logoutUser);
router.post("/logout", logoutUser);

export default router;

