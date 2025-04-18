import express from "express";
import { passportCall, authorizationTo } from "../utils.js";
import {getIndex, getLoginForm, getRegisterForm, getRegisterPropertyForm} from "../controllers/views.controller.js"
import { showProperties, showPropertiesById, getProfileOwner } from "../controllers/properties.controller.js";
import { showCart } from "../controllers/carts.controller.js";


const viewsRouter = express.Router();

viewsRouter.get("/", getIndex);
viewsRouter.get("/login", getLoginForm);
viewsRouter.get("/register", getRegisterForm);
//viewsRouter.get("/propertyCatalog", passportCall("jwt"), showProperties);
viewsRouter.get("/propertyCatalog/:propertyId", passportCall("jwt"), showPropertiesById);
viewsRouter.get("/dashboard-owner/:oid", authorizationTo("jwt", "owner"), getProfileOwner)
viewsRouter.get("/registerProperty", authorizationTo("jwt", "owner"), getRegisterPropertyForm);
viewsRouter.get("/cart/:cid", authorizationTo("jwt", "user"), showCart);



viewsRouter.get("/propertyCatalog", authorizationTo("jwt", "user"), showProperties);

export default viewsRouter;