import express from "express";
import {payProperty, getProperties, createProperty, getPropertyById, getPropertyByOwner, updateProperty, deletePropertyById} from "../controllers/properties.controller.js";
import { authorizationTo } from "../utils.js";

const propertiesRouter = express.Router();

propertiesRouter.get("/", getProperties);
propertiesRouter.post("/", createProperty);
propertiesRouter.get("/:pid", getPropertyById);
propertiesRouter.get("/owners/:owner", getPropertyByOwner);
propertiesRouter.put("/:pid", authorizationTo("jwt", "user"), updateProperty);
propertiesRouter.put("/purchase/:pid", payProperty);
propertiesRouter.delete("/delete/:pid", deletePropertyById)

export default propertiesRouter;