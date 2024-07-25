import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ipAddress: String,
    browser: String,
    os: String,
    isMobile: Boolean,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Login', loginSchema);
