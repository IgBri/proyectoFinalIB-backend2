import express from "express";
import { createCart, getCartById, deletePropertyInCart, deleteCart, addToCart, deleteAfterPay } from "../controllers/carts.controller.js";

const cartsRouter = express.Router();

cartsRouter.post("/", createCart);
cartsRouter.post("/:cid", addToCart);
cartsRouter.get("/:cid", getCartById);
cartsRouter.delete("/:cid/delete/:pid", deletePropertyInCart);
cartsRouter.delete("/:cid/pay/:pid/delete", deleteAfterPay)
cartsRouter.delete("/:cid", deleteCart);

export default cartsRouter;