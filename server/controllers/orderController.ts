import Order from "../models/orderSchema";
import { Request, Response, NextFunction } from "express";


// Create a new order
export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};
// Get all orders
export const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find().populate("serviceId clientId freelancerId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
// Get a single order by ID
export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate("serviceId clientId freelancerId");
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
}
// Update an order by ID
export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("serviceId clientId freelancerId");
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
};
// Get orders by client ID
export const getOrdersByClientId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find({ clientId: req.params.clientId }).populate("serviceId freelancerId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders for client", error });
  }
}
// Get orders by freelancer ID
export const getOrdersByFreelancerId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find({ freelancerId: req.params.freelancerId }).populate("serviceId clientId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders for freelancer", error });
  }
}
// Get orders by service ID
export const getOrdersByServiceId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find({ serviceId: req.params.serviceId }).populate("clientId freelancerId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders for service", error });
  }
}
// Get orders by status
export const getOrdersByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find({ status: req.params.status }).populate("serviceId clientId freelancerId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders by status", error });
  }
}
// Get orders by date range
export const getOrdersByDateRange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    }).populate("serviceId clientId freelancerId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders by date range", error });
  }
}

//export

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByClientId,
  getOrdersByFreelancerId,
  getOrdersByServiceId,
  getOrdersByStatus,
  getOrdersByDateRange
};