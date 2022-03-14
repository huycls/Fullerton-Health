import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        service: {type: String, required: true},
        date: { type: Array, required: false},
        // customer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        location: {type:String, required: true},
        status: {type: String, required: true},
        createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;