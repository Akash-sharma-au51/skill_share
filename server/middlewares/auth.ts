import jwt from 'jsonwebtoken';
import  User  from '../models/userModel';
import { Request, Response, NextFunction } from "express";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      role: string;
      // add other user properties if needed
      [key: string]: any;
    }
    interface Request {
      user?: User;
    }
  }
}

// Middleware to check if the user is an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
}
// Middleware to check if the user is a regular user
export const isUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'user') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Users only.' });
}
// Middleware to check if the user is a guest
export const isGuest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Guests only.' });
}
export default {
  isAdmin,
  isUser,
  isGuest
};
