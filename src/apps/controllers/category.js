const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");
exports.index = async (req,res) => {

    const page = Number(req.query.page) || 1;
    const limit = 3;
    const skip = page * limit - limit;
    const totalRows = await CategoryModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit);

    const categories = await CategoryModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
    return res.render("admin/categories/category", { 
        categories,
        paginate: paginate(totalPages, limit, page),
        prev: page - 1,
        next: page + 1,
        page,
        totalPages,
     });
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
