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
    maxLength:[20, "Password must be at most 20 characters long"],
    minLength: [6, "Password must be at least 6 characters long"],
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
