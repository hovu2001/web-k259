const UserModel = require("../models/user");
const ProductModel = require("../models/product");
exports.dashboard = async (req, res) => {
  //
  const users = await UserModel.find().countDocuments();
  const products = await ProductModel.find().countDocuments();
  return res.render("admin/admin", {
    users,
    products,
  });
};
