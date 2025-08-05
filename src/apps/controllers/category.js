const CategoryModel = require("../models/category");
exports.index = async (req,res) => {
    const categories = await CategoryModel.find()
    .sort({ _id: -1 });
    return res.render("admin/categories/category", { categories });
};
exports.create = (req,res) => {
    return res.send("Create category");
};
exports.edit = (req,res) => {
    return res.send("Edit category");
};
exports.del = (req,res) => {
    return res.send("Delete category");
};
