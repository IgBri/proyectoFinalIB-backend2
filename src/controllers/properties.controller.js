import { propertiesService, userService } from "../services/service.js";
import {PropertyDTO} from "../services/dto/property.dto.js";
import { PropertyDTOtoRender } from "../services/dto/property.dto.js";

export const getProperties = async (req, res) => {
    try {
        const properties = await propertiesService.getAll();

        if(!properties) {
            return res.status(202).json({message: "No se encontraron propiedades"});
        } else {
            res.status(200).json({message: "Propeidades encontradas", payload: properties});
        }
    } catch (error) {
        res.status(500).json({message: "Error al obtener las propiedades", error: error.message});
    }
};
export const createProperty = async (req, res) => {
    try {
        const {addressName, addressNumber, currency, dni, monetaryValue, useStatus, daysAvaliable} = req.body;

        const owner = await userService.getByDni(dni)

        if(!owner){
            return res.status(400).json({message: "No se ha encontrado un propietario registrado para esta propiedad"});
        };

        const propertyDto = new PropertyDTO(owner._id, addressName, addressNumber, currency, monetaryValue, useStatus, daysAvaliable);

        const result = await propertiesService.create(propertyDto);

        res.status(201).json({message: "Propiedad guardada con exito", payload: result, user: owner});
    } catch (error) {
        res.status(500).json({message: "Error al guardar la propiedad", error: error.message});
    }
};
export const getPropertyById = async (req, res) => {
    const id = req.params.pid;
    try {
        const property = await propertiesService.getById(id);
        if(!property){
            return res.status(404).json({message: "Propiedad no encontrada"});
        } else {
            res.status(200).json({message: "Propiedad onbtenida con exito", payload: property});
        };
    } catch (error) {
        res.status(500).json({message: `Error al obtener la propiedad con id ${id}`, error: error.message});
    };
};
export const getPropertyByOwner = async (req, res) => {
    const owner = req.params.owner
    try {
        const result = await propertiesService.getByOwner(owner);
        if(!result){
            return res.status(404).json({message: "Propietario no encontrado"});
        } else {
            res.status(200).json({message: "Propietario encontrado", payload: result});
        }
    } catch (error) {
        res.status(500).json({message: `Error obtener la propiedad de ${owner}`, error: error.message});
    };
};
export const updateProperty = async (req, res) => {
    const {pid} = req.params;
    const {qtyDays} = req.body;
    try {
        const result = await propertiesService.updateById(pid, qtyDays);
        
        res.status(200).json({status:"success", payload: result});
    } catch (error) {
        res.status(500).json({message: `Error al editar la propiedad`, error: error.message});
    }
};
export const payProperty = async (req, res) => {
    const {pid} = req.params;
    const {condition} = req.body;
    try {
        const result = await propertiesService.payProperty(pid, condition);

        res.status(200).json({status:"success", payload: result});
    } catch (error) {
        res.status(500).json({message: `Error al editar la propiedad`, error: error.message});
    }
};
export const deletePropertyById = async (req, res) => {
    const {pid} = req.params;
    try {
        const result = await propertiesService.delete(pid);

        res.status(200).json({status: "success", payload: result});
        
    } catch (error) {
        res.status(500).json({message: `Error al borrar la propiedad`, error: error.message});
    };
};
//Render view
export const showProperties = async (req, res) => {
    try {
        const properties = await propertiesService.showAll();
        if(!properties) {
            return res.status(202).json({message: "No se encontraron propiedades"});
        };

        const user = req.user;

        const propertyDto = properties.map((property) => {
            return new PropertyDTOtoRender(property)
        });

        res.render("properties", {propertyDto, user});
    } catch (error) {
        res.status(500).json({message: "Error al obtener las propiedades", error: error.message});
    };
};
export const showPropertiesById = async (req, res) => {
    const {propertyId} = req.params;
    const user = req.user;
    try {
        const infoProperty = await propertiesService.showById(propertyId);

        if(!infoProperty){
            return res.status(404).json({status:"error", message: "Inmueble no encontrado"});
        };

        res.render("property", {infoProperty, user});
    } catch (error) {
        res.status(500).json({message: "Error al obtener las propiedades", error: error.message});
    };
};
export const getProfileOwner = async (req, res) => {
    const {oid} = req.params;
    try {
        const propertiesOwner = await propertiesService.showByOwner(oid);

        res.render("dashboard-owner", {propertiesOwner})
    } catch (error) {
        res.status(500).json({message: "Error al obtener las propiedades", error: error.message});
    };
};
