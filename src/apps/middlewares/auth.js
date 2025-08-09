const UserModel = require("../models/user");

exports.checkAdmin = async (req, res, next) => {
  // Nếu đã login thường
  if (req.session.email && req.session.password) {
    return next();
  }

  // Nếu login Google
  if (req.isAuthenticated()) {
    return next();
  }

  // Nếu có Remember Me cookie → check luôn ở đây
  const { remember_email, remember_password } = req.cookies;
  if (remember_email && remember_password) {
    const user = await UserModel.findOne({ email: remember_email });
    if (user && user.password === remember_password) {
      req.session.email = remember_email;
      req.session.password = remember_password;
      return next();
    } else {
      // Cookie sai → xóa
      res.clearCookie("remember_email");
      res.clearCookie("remember_password");
    }
  }

  // Ngược lại → chưa login
  return res.redirect("/admin/login");
};

exports.checkLogin = async (req, res, next) => {
  // Nếu đã login thường
  if (req.session.email && req.session.password) {
    return res.redirect("/admin/dashboard");
  }

  // Nếu login Google
  if (req.isAuthenticated()) {
    return res.redirect("/admin/dashboard");
  }

  // Không có gì → cho vào trang login
  next();
};
