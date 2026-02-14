import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    jobId: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String,
        required: true,
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['applied', 'under review', 'rejected', 'accepted'],
        default: 'applied'
    },
    reviedAt: {
        type: Date,
    },
    reviewedBy: {
        type: String,
    },
});

applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default Application;