import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: {
            addressName: String,
            addressNumber: Number
        },
        required: true
    },
    price: {
        type: {
            monetaryValue: Number,
            currency: String
        },
        required: true
    },
    useStatus: {
        type: String,
        enum: ["sale", "rent"],
        required: true
    },
    daysAvaliable: {
        type: Number,
        default: 360
    },
    daysRequested: {
        type: Number,
        default: 0
    },
    contractStatus: {
        type: Boolean,
        default: false
    },

});

const Property = new mongoose.model("Property", propertySchema);

export default Property;