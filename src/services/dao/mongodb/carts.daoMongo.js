import Cart from "../../models/cartModel.js"

export default class CartService{
    create = async (data) => {
        const existCart = await Cart.findOne({cartUser: data});

        if(!existCart){
            let result = await Cart.create({
                cartUser: data
            });

            return result;
        } else {
            return existCart;
        }
    };
    showById = async (cid) => {
        let result = await Cart.findOne({_id: cid}).populate("cartUser").populate("properties.property").lean();

        return result;
    };
    addToCart = async(cid, propertyId) => {
        let result = await Cart.findByIdAndUpdate(
            cid, 
            {$push: {properties: {property: propertyId}}},
            {new: true}
        );
        return result;
    };
    delete = async (cid, pid) => {
        let result = await Cart.findByIdAndUpdate(
            cid,
            {$pull: {properties: {_id: pid}}},
            {new: true}
        );

        console.log("resultDelete: ", result)

        return result;
    };
    findById = async (cartId) => {
        let result = await Cart.findOne({_id: cartId}).populate("cartUser").populate("properties.property").lean();

        return result;
    };
    deleteAfterPay = async (cid, pid) => {
        console.log("resulyDelete")
        let result = await Cart.findByIdAndUpdate(
            cid,
            {$pull: {properties: {property: pid}}},
            {new: true}
        );

        return result;
    };
    clear = async (cid) => {
        let result = await Cart.findByIdAndUpdate(
            cid,
            {$set: {properties: []}},
            {new: true}
        )

        return result;
    };
};
