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
exports.edit = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  return res.render("admin/users/edit_user", { user, error: null });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, password, re_password, role } = req.body;

  const user = await UserModel.findById(id);
  if (!user) return res.status(404).send("Không tìm thấy người dùng");

  // Kiểm tra email đã tồn tại ở user khác chưa
  const emailExists = await UserModel.findOne({ email, _id: { $ne: id } });
  if (emailExists) {
    return res.render("admin/users/edit_user", {
      user: { _id: id, full_name, email, role },
      error: "Email đã tồn tại!",
    });
  }

  if (password || re_password) {
    if (password !== re_password) {
      return res.render("admin/users/edit_user", {
        user: { _id: id, full_name, email, role },
        error: "Mật khẩu không khớp!",
      });
    }

    user.password = password;
  }

  user.full_name = full_name;
  user.email = email;
  user.role = role;

  await user.save();
  return res.redirect("/admin/users");
};

exports.del = async (req, res) => {
  const {id} = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  return res.redirect("/admin/users");
};
