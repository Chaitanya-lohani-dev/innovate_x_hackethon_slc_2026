import mongoose from 'mongoose';

const connectDB = async () => mongoose.connect(`${process.env.MONGO_URL}`)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error);
        process.exit(1);
    });

export default connectDB;