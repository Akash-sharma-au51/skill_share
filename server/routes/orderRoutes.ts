import { getAllOrders,getOrderById,getOrdersByClientId,getOrdersByDateRange,getOrdersByFreelancerId,getOrdersByServiceId,getOrdersByStatus } from "../controllers/orderController";
import express, { RequestHandler } from "express";
import { isAdmin, isUser } from "../middlewares/auth";

const router = express.Router();
// Get all orders
router.get("/", isUser as RequestHandler, getAllOrders);
// Get order by ID
router.get("/:id", isUser as RequestHandler, getOrderById);
// Get orders by client ID
router.get("/client/:clientId", isUser as RequestHandler, getOrdersByClientId);
// Get orders by freelancer ID
router.get("/freelancer/:freelancerId", isUser as RequestHandler, getOrdersByFreelancerId);
// Get orders by service ID
router.get("/service/:serviceId", isUser as RequestHandler, getOrdersByServiceId);
// Get orders by status
router.get("/status/:status", isUser as RequestHandler, getOrdersByStatus);
// Get orders by date range
router.get("/date-range", isUser as RequestHandler, getOrdersByDateRange);

// Export the router
export default router;


