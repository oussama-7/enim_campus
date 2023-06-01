import mongoose from 'mongoose';

const DepotShema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        type: {
            type: String,
            enum: ['support', 'travail à faire'],
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productShema);

export default Depot;