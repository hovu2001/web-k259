exports.checkAdmin = async (req, res, next) => {
  if (!req.session.email || !req.session.password)
    return res.redirect("/admin/login");
  next();
};
exports.checkLogin = async (req, res, next) => {
  if (req.session.email && req.session.password)
    return res.redirect("/admin/dashboard");
  next();
};
