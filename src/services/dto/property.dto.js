export class PropertyDTO {
    constructor(ownerId, addressName, addressNumber, currency, monetaryValue, useStatus, daysAvaliable){
        this.owner = ownerId,
        this.address = {addressName, addressNumber},
        this.price = {monetaryValue, currency},
        this.useStatus = useStatus
        this.daysAvaliable = daysAvaliable
    }
};

export class PropertyDTOtoRender {
    constructor(property){
        this.id = property._id,
        this.ownerId = property.owner._id,
        this.owner = `${property.owner.first_name} ${property.owner.last_name}`
        this.age = property.owner.age,
        this.dni = property.owner.dni,
        this.email = property.owner.email,
        this.userCondition = property.owner.userCondition
    }
};