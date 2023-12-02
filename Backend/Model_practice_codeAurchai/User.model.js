import mongoose from 'mongoose';

const userschema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: true,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: true,
            required: [true,"Password is mandantory"]
        }

    },
    { timestamp: true }
);

export const User = mongoose.model("User", userschema);