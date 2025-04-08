import mongoose from 'mongoose';
import QRCode from 'qrcode';

const farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    qrCode: {
        type: String
    },
    isValid: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    earnings: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate QR Code before saving the farmer
farmerSchema.pre('save', async function (next) {
    if (this.isNew) {
        const qrCodeData = JSON.stringify({ id: this._id, name: this.name, email: this.email });
        this.qrCode = await QRCode.toDataURL(qrCodeData);
    }
    next();
});

const Farmer = mongoose.model('Farmer', farmerSchema);
export default Farmer;