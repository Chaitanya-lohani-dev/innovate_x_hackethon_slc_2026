import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    role: {
        type: String,
        enum: ['student', 'admin', 'HR'],
        default: 'student',
    },
    registeredAt: {
        type: Date,
        default: Date.now,
    },
    profilePictureUrl: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    organisation: {
        type: String,
        required: true,
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;