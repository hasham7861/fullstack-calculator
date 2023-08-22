import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.DATABASE_URL! || 'mongodb://localhost:27017/FullStackCalculator';

export default async function initMongoDBConnection () {
  await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  } as ConnectOptions);
  
  mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established');
  });
  
  mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
  });
}
