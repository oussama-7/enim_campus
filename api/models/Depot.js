import mongoose from 'mongoose';

const DepotShema = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        type: {
            type: String,
            enum: ['support', 'travail à faire'],
            unique: true
        },
        document: { type: String },
    },
    {
        timestamps: true,
    }
);

const Depot = mongoose.model('Depot', DepotShema);

export default Depot;