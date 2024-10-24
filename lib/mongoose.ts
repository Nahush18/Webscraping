import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true); // Enable or disable strict mode for queries

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    return;
  }

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });

    isConnected = true; // Set connection status to true
    console.log('MongoDB Connected');
  } catch (error: unknown) {
    // Narrow the type of error to check if it's an instance of Error
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
    } else {
      console.error('An unknown error occurred during MongoDB connection.');
    }
    process.exit(1); // Exit process if unable to connect
  }
};
