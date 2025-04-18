import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ""
    },
    purchase_dataTime: {
        type: Date,
        default: Date.now
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    amountDays: Number,
    price: {
        totalPrice: Number,
        currency: String
    },
    purchase: String
});

const Ticket = new mongoose.model("Ticket", ticketSchema);

export default Ticket;