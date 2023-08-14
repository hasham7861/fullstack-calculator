import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = 'mongodb://localhost:27017/FullStackCalculator';
console.log('MONGO_URI', MONGO_URI);
export default async function initMongoDBConnection () {
  await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  
  mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established');
  });
  
  mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
  });
}
