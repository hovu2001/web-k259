const UserModel = require("../models/user");
exports.getLogin = (req, res) => {
  return res.render("admin/login", { error: null });
};
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  let error;
  if (user) {
    if (user.password === password) {
      req.session.email = email;
      req.session.password = password;
      return res.redirect("/admin/dashboard");
    } else {
      error = "Mật khẩu không hợp lệ!";
    }
  } else {
    error = "Email không hợp lệ!";
  }
  return res.render("admin/login", { error });
};
exports.logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/admin/login");
};
