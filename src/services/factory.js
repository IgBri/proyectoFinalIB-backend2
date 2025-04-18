/*import config from "../../config/config.js";
import {connectMongoDB} from "../../utils.js";

let userService 
let propertyService

console.log("config.persistence: ", config.persistence)

switch (config.persistence) {
    case "mongodb":
        connectMongoDB();

        const {default: UserServiceMongo} = await import("../dao/mongo/users.service.js");
        userService = new UserServiceMongo();

        console.log("Servicio de usuarios cargado: ")
        console.log(userService)

        const {default: PropertyServiceMongo} = await import("../dao/mongo/properties.service.js");
        propertyService = new PropertyServiceMongo();

        console.log("Servicio de propiedades cargado: ")
        console.log(propertyService)


        break;
    default:
        break;
};

export {userService}*/