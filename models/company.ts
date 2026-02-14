import mongoose from "mongoose";
import { required } from "zod/mini";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;