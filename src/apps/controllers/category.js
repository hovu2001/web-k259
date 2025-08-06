const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");
const slug = require("slug");
exports.index = async (req, res) => {
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
exports.create = (req, res) => {
  return res.render("admin/categories/add_category", { error: null });
};

exports.store = async (req, res) => {
  const { body } = req;
  const titleFromForm = body.title; 
  const slugFromTitle = slug(titleFromForm?.trim()); 
  const categoryExists = await CategoryModel.findOne({ slug: slugFromTitle });
  if (categoryExists) {
    return res.render("admin/categories/add_category", {
      error: "Danh mục đã tồn tại!",
      title: titleFromForm,
    });
  }
  const category = {
    title: titleFromForm, 
    slug: slugFromTitle,
  };
  await CategoryModel(category).save();
  return res.redirect("/admin/categories");
};
exports.edit = (req, res) => {
  return res.render("admin/categories/edit_category");
};
exports.del = (req, res) => {
  return res.send("Delete category");
};
