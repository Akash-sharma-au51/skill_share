import express, { RequestHandler } from "express";
import { createService, getAllServices, getServiceById, updateService, deleteService, getServicesByCategory } from "../controllers/serviceController";

const router = express.Router();

import { isAdmin, isUser } from "../middlewares/auth";

router.post("/", isAdmin as RequestHandler, createService);
router.get("/", isUser as RequestHandler, getAllServices);
router.get("/:id", isUser as RequestHandler, getServiceById);
router.put("/:id", isAdmin as RequestHandler, updateService);
router.delete("/:id", isAdmin as RequestHandler, deleteService);
router.get("/category/:category", isUser as RequestHandler, getServicesByCategory);

export default router;

