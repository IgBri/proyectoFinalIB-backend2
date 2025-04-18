import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    cartUser: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
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

});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;