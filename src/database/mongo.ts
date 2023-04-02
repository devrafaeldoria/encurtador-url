import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false);
export const mongoConnection = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB');
    console.log(error);
  }
};
