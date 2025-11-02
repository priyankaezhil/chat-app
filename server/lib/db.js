import mongoose from "mongoose";

// Function to connect to the mongodb database
export const connectDB = async () => {
    try {
        // Event listener for successful database connection
        mongoose.connection.on('connected', () => console.log('Database Connected'));

        // Attempt to connect to MongoDB using the URI from environment variables
        // and specifying the 'chat-app' database
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    } catch (error) {
        // Catch and log any errors that occur during the connection process
        console.error("Error connecting to MongoDB:", error); // Using console.error for errors
        process.exit(1); // Exit the process with a failure code
    }
};