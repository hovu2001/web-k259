const UserModel = require("../models/user");
const paginate = require("../../common/paginate");
exports.index = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 4;
  const skip = page * limit - limit;
  const totalRows = await UserModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);

  const users = await UserModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  return res.render("admin/users/user", {
    users,
    paginate: paginate(totalPages, limit, page),
    prev: page - 1,
    next: page + 1,
    page,
    totalPages,
  });
};
exports.create = async (req, res) => {
  const users = await UserModel.find().sort({ _id: 1 });
  const roles = ["admin", "member"];
  return res.render("admin/users/add_user", { users, roles, error: null });
};

exports.store = async (req, res) => {
  const { full_name, email, password, re_password, role } = req.body;
  const roles = ["admin", "member"];
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return res.render("admin/users/add_user", {
      roles,
      error: "Email đã tồn tại!",
      full_name,
      email,
      selectedRole: role,
    });
  }
  if (password !== re_password) {
    return res.render("admin/users/add_user", {
      roles,
      error: "Mật khẩu không khớp!",
      full_name,
      email,
      selectedRole: role,
    });
  }
  await UserModel.create({ full_name, email, password, role });
  return res.redirect("/admin/users");
};
exports.edit = (req, res) => {
  return res.render("admin/users/edit_user");
};
exports.del = (req, res) => {
  return res.send("Delete user");
};
