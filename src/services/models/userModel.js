import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    age: {type: Number, required: true},
    dni: {type: Number, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    phoneNumber: {type: Number, required: true},
    userCondition: {
        type: String,
        enum: ["owner", "tenant", "user"],
        required: true
    },
    contractStatus: {
        type: Boolean,
        default: false
    },
    properties: {
        type: [
            {
                property: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Property"
                }
            }
        ],
        default: []
    },
    contracts: {
        type: [
            {
                contract: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Contract"
                }
            }
        ],
        default: []
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    }

});

const User = new mongoose.model("User", userSchema);

export default User;