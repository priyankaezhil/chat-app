import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        profilePic: {
            type: String,
            default: ""
        },
        bio: {
            type: String
        },
    },
    {
        timestamps: true // Adds createdAt and updatedAt timestamps automatically
    }
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;