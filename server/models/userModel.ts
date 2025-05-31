import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: [100, "Password must be at most 100 characters long"], // Changed to 'maxlength' and increased limit
    minlength: [6, "Password must be at least 6 characters long"],    // Changed to 'minlength'
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
    default: "https://www.gravatar.com/avatar/placeholder",
  },
  bio: {
    type: String,
    default: "This is my bio",
  },
  role:{
    type: String,
    enum: ["freelancer", "client"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
const User = mongoose.model("User", userSchema)
export default User
