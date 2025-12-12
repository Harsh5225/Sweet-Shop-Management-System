import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a sweet name'],
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price must be positive']
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a quantity'],
        min: [0, 'Quantity must be positive']
    }
}, {
    timestamps: true
});

const Sweet = mongoose.model('Sweet', sweetSchema);

export default Sweet;
