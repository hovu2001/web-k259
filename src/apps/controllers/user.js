exports.index = (req,res) => {
    return res.send("Get all user");
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
