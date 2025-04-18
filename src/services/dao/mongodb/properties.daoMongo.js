import Property from "../../models/propertyModel.js";

export default class PropertyService {
    getAll = async () => {
        let users = await Property.find();
        return users;
    };
    create = async (data) => {
        let result = await Property.create(data);
        return result;
    };
    getById = async (id) => {
        let result = await Property.findOne({_id: id})
        return result;
    };
    getByOwner = async (owner) => {
        let result = await Property.findOne({owner: owner});
        return result;
    };
    showAll = async () => {
        let result = await Property.find().populate("owner").lean();
        return result;
    };
    showById = async (id) => {
        let result = await Property.findOne({_id: id}).populate("owner").lean();
        return result;
    };
    showByOwner = async (oid) => {
        let result = await Property.find({owner: oid}).populate("owner").lean();
        return result;
    };
    updateById = async (pid, qtyDays) => {
        let result = await Property.findByIdAndUpdate(
            pid,
            {daysRequested: qtyDays},
            {new: true}
        );
        return result;
    };
    payProperty = async (pid, condition) => {
        let result = await Property.findByIdAndUpdate(
            pid,
            { $set: {daysAvaliable: condition, daysRequested: 0}},
            {new: true}
        );
        return result;
    };
    delete = async (pid) => {
        let result = await Property.findByIdAndDelete(pid);
        return result;
    };
}