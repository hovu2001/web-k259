const UserModel = require("../models/user");
exports.index = async (req, res) => {
  
    const users = await UserModel.find()
    .sort({ _id: -1 });
    return res.render("admin/users/user", { users });
   
};
exports.create = (req,res) => {
    return res.send("Create user");
};
exports.edit = (req,res) => {
    return res.send("Edit user");
};
exports.del = (req,res) => {
    return res.send("Delete user");
};
