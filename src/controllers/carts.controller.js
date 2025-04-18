import { cartService } from "../services/service.js";

export const createCart = async (req, res) => {
    try {
        const {payload} = req.body;
        const newCart = await cartService.create(payload);

        if(!newCart) return res.status(404).json({status: "error", message: "Carrito inexistente"});

        res.status(200).send({status: "Success", message: "Carrito encontrado", payload: newCart})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
export const addToCart = async (req, res) => {
    const {cid} = req.params;
    const {propertyId} = req.body;

    try {
        const cart = await cartService.addToCart(cid, propertyId);
        
        if(!cart){
            return res.status(403).json({status:"error", message: "Error al agregar inmueble al carrito"});
        }
        res.status(201).json({status:"success", message: "Inmueble agregado al carrito", payload: cart})
    } catch (error) {
        res.status(500).json({message: error.message});
    };
};
export const deletePropertyInCart = async (req, res) => {
    const {cid, pid} = req.params;

    try {
        const cart = await cartService.delete(cid, pid);

        res.status(200).json({status: "success", payload: cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
export const deleteAfterPay = async (req, res) => {
    const {cid, pid} = req.params;

    try {
        const cart = await cartService.deleteAfterPay(cid, pid);

        res.status(200).json({status: "success", payload: cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
export const getCartById = async (req, res) => {
    const {cid} = req.params;
    try {
        const cart = await cartService.findById(cid);

        if(!cart){
            throw new Error("Carrito no encontrado");
        };

        res.status(200).json({status: "success", payload: cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    };
};
export const deleteCart = async (req, res) => {
    const {cid} = req.params;
    try {
        const clearCart = await cartService.clear(cid)
        res.status(200).json({message: "Carrito vaciado", payload: clearCart})
    } catch (error) {
        res.status(500).json({message: "Error al vaciar el carrito", error: error.message});
    };
};
//Render view
export const showCart = async (req, res) => {
    const {cid} = req.params;
    try {
        const cart = await cartService.showById(cid);

        if(!cart){
            return res.status(404).json({message: "Carrito no encontrado"});
        };


        res.render("cart", {cart});
    } catch (error) {
        res.status(500).json({message: "Error al obtener el carrito", error: error.message});
    };
};

















export const saveCart = async (req, res) => {
    try {

    } catch (error) {
        
    }
};
export const updateCartById = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export const updatePropertyInCart = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};
