import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: [100, "Title must be at most 100 characters long"],
  },
  description: {
    type: String,
    required: true,
    maxLength: [500, "Description must be at most 500 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"],
  },
    image: {
        type: String,
        default: "https://www.example.com/default-image.jpg",
    },
  category: {
    type: String,
    required: true,
    enum: ["Web Development", "Graphic Design", "Digital Marketing", "Content Writing", "Other"],
    default: "Other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
