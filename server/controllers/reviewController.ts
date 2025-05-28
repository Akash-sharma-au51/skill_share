import Review from "../models/reviewSchema";
import { Request, Response } from "express";

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

// Get all reviews
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate("serviceId userId");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
}
// Get a single review by ID
export const getReviewById = async (req: Request, res: Response) => {
    try {
        const review = await Review.findById(req.params.id).populate("serviceId userId");
        if (!review) {
        return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Error fetching review", error });
    }
};
// Update a review by ID
export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("serviceId userId");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
}
// Delete a review by ID
export const deleteReview = async (req: Request, res: Response) => {    
    
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
}
// Get reviews by service ID
export const getReviewsByServiceId = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId }).populate("serviceId userId");
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this service" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
}
// Get reviews by user ID
export const getReviewsByUserId = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId }).populate("serviceId userId");
        if (reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for this user" });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
};

// Get average rating for a service
export const getAverageRating = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId });
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this service" });
    }
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: "Error calculating average rating", error });
  }
}
// Get reviews by rating
export const getReviewsByRating = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ rating: req.params.rating }).populate("serviceId userId");
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found with this rating" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews by rating", error });
  }
}
// Get reviews by date range
export const getReviewsByDateRange = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const reviews = await Review.find({
      createdAt: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    }).populate("serviceId userId");
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found in this date range" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews by date range", error });
  }
}

export default {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByServiceId,
  getReviewsByUserId,
  getAverageRating,
  getReviewsByRating,
  getReviewsByDateRange
};

