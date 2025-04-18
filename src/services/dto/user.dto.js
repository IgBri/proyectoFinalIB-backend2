export default class UserDTO {
    constructor(user){
        this.userid = user._id,
        this.user = `${user.first_name} ${user.last_name}`
        this.age = user.age,
        this.email = user.email,
        this.role = user.userCondition,
        this.isOwner = user.userCondition === "owner",
        this.isUser = user.userCondition === "user"
        this.cart = user.cart
    }
};