export const getIndex = (req, res) => {
    return res.render("index");
};
export const getLoginForm = (req, res) => {
    return res.render("login");
};
export const getRegisterForm = (req, res) => {
    return res.render("registerUser");
};
export const getRegisterPropertyForm = async (req, res) => {
    return res.render("registerProperty");
};