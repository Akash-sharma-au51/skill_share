import Service from '../models/serviceSchema';
import { Request, Response } from 'express';

// Create a new service
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all services
export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a service by ID
export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(200).json(service);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service by ID
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(200).json(service);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service by ID
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by category
export const getServicesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find({ category: req.params.category });
    if (services.length === 0) {
      res.status(404).json({ message: 'No services found in this category' });
      return;
    }
    res.status(200).json(services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByCategory,
};
